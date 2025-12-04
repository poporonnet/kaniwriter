import { calculateCrc8 } from "../../utils/calculateCrc8";
import { Failure, Result, Success } from "../result";
import { MrbwriteAdapter } from "./adapter";
import { Profile } from "./profile";

export const targets = ["ESP32", "RBoard"] as const;
export type Target = (typeof targets)[number];

type Logger = (message: string, ...params: unknown[]) => void;
type Listener = (buffer: string[]) => void;

type Event = "SuccessToEnterWriteMode" | "SuccessToExitWriteMode";
type Job = { job: Promise<Result<unknown, Error>>; description: string };

export type Config = { profile?: Profile; log: Logger; onListen?: Listener };

const abortReason = "abortStream" as const;

export class MrbwriteController<Adapter extends MrbwriteAdapter<unknown>> {
  private log: Logger;
  private onListen: Listener | undefined;

  private readable: ReadableStream<string> | undefined;

  private sourceClosed: Promise<void> | undefined;
  private sinkClosed: Promise<void> | undefined;

  private sourceAborter: AbortController | undefined;
  private sinkAborter: AbortController | undefined;

  private _writeMode: boolean;
  private encoder: TextEncoder;
  private decoder: TextDecoder;
  private buffer: string[];
  private jobQueue: Job[];

  private adapter: Adapter;

  constructor(config: Config, adapter: Adapter) {
    this.log = config.log;
    this.onListen = config.onListen;
    this.buffer = [];
    this._writeMode = false;
    this.encoder = new TextEncoder();
    this.decoder = new TextDecoder();
    this.jobQueue = [];
    this.adapter = adapter;

    adapter.setProfile(config.profile);
  }

  public get isConnected(): boolean {
    return this.adapter.isConnected();
  }

  public get isWriteMode(): boolean {
    return this._writeMode;
  }

  setProfile(profile: Profile) {
    this.adapter.setProfile(profile);
  }

  async connect(
    option?: Parameters<Adapter["request"]>[0]
  ): Promise<Result<null, Error>> {
    this.handleText("\r\n\u001b[32m> try to connect...\u001b[0m\r\n");

    const requestRes = await this.adapter.request(option);
    if (requestRes.isFailure()) {
      this.handleText("\r\n\u001b[31m> failed to connect.\u001b[0m\r\n");
      return requestRes;
    }

    const openRes = await this.adapter.open();
    if (openRes.isFailure()) {
      this.handleText(
        "\r\n\u001b[31m> failed to open serial port.\u001b[0m\r\n"
      );
      return openRes;
    }

    this.handleText("\r\n\u001b[32m> connection established.\u001b[0m\r\n");
    return Success.value(null);
  }

  async disconnect(): Promise<Result<null, Error>> {
    this.handleText("\r\n\u001b[32m> try to disconnect...\u001b[0m\r\n");

    const abortRes = await this.abortStreams();
    if (abortRes.isFailure()) {
      this.handleText(
        "\r\n\u001b[31m> failed to close serial port.\u001b[0m\r\n"
      );
      return abortRes;
    }

    const closeRes = await this.adapter.close();
    if (closeRes.isFailure()) {
      this.handleText(
        "\r\n\u001b[31m> failed to close serial port.\u001b[0m\r\n"
      );
      return closeRes;
    }

    this.handleText("\r\n\u001b[32m> successfully disconnected.\u001b[0m\r\n");
    return Success.value(null);
  }

  async startListen(): Promise<Result<null, Error>> {
    try {
      const sourceAborter = new AbortController();
      this.sourceAborter = sourceAborter;

      const readableRes = this.adapter.getReadable(sourceAborter);
      if (readableRes.isFailure()) {
        return readableRes;
      }
      const sourceReadable = readableRes.value;

      const decode = (data: Uint8Array) =>
        this.decoder.decode(data, { stream: true });
      const handleText = (text: string) => this.handleText(text);
      const log = this.log;
      const handleEvent = (event: Event | null) => this.handleEvent(event);
      const decodeStream = new TransformStream<Uint8Array, string>({
        transform: (chunk, controller) => controller.enqueue(decode(chunk)),
      });
      const logStream = new TransformStream<string, string>({
        transform: async (chunk, controller) => {
          log("Received", { chunk });

          const event = handleText(chunk);
          if (event.value.event) log("Event detected", event.value);

          const res = await handleEvent(event.value.event);
          if (res) log("Event handled", res);

          controller.enqueue(chunk);
        },
      });

      this.readable = sourceReadable
        .pipeThrough(decodeStream, sourceAborter)
        .pipeThrough(logStream, sourceAborter);

      const setRes = this.setSink(new WritableStream<string>());
      if (setRes.isFailure()) return setRes;

      await new Promise<void>((resolve) =>
        sourceAborter.signal.addEventListener("abort", () => resolve(), {
          once: true,
        })
      );

      await this.sinkClosed?.catch((reason) => {
        if (reason == abortReason) return;

        this.handleText(
          "\r\n\u001b[31m> port closed unexpectedly.\u001b[0m\r\n"
        );
        throw reason;
      });

      return Success.value(null);
    } catch (error) {
      this._writeMode = false;

      return Failure.error("Error excepted while reading.", { cause: error });
    } finally {
      if (!this.sourceAborter?.signal.aborted) {
        await this.close();
      }
    }
  }

  async sendCommand(
    command: string,
    option?: Partial<{ force: boolean; ignoreResponse: boolean }>
  ): Promise<Result<string, Error>> {
    if (!this.adapter.isConnected()) {
      return Failure.error("Not connected.");
    }
    if (!option?.force && !this._writeMode) {
      return Failure.error("Not write mode now.");
    }

    await this.completeJobs();
    this.handleText(`\r\n> ${command}\r\n`);
    this.log("Send", { command });

    return this.sendData(this.encoder.encode(`${command}\r\n`), {
      ignoreResponse: option?.ignoreResponse,
    });
  }

  async tryEnterWriteMode(): Promise<Result<string, Error>> {
    if (!this.adapter.isConnected()) {
      return Failure.error("Not connected.");
    }
    if (this._writeMode) {
      return Failure.error("Already write mode.");
    }

    await this.completeJobs();
    this.handleText(
      `\r\n\u001b[32m> try to enter command mode...\u001b[0m\r\n`
    );

    // 改行文字(CRLF)のみを送信
    return this.sendData(this.encoder.encode("\r\n"), {
      ignoreResponse: true,
    });
  }

  async writeCode(
    binary: Uint8Array,
    option?: Partial<{ execute: boolean; autoVerify: boolean }>
  ): Promise<Result<string, Error>> {
    if (!this.adapter.isConnected()) {
      return Failure.error("Not connected.");
    }
    if (!this._writeMode) {
      return Failure.error("Not write mode now.");
    }

    await this.completeJobs();

    const clearRes = await this.sendCommand("clear");
    if (clearRes.isFailure()) return clearRes;

    this.log("Clear", clearRes);
    const writeSizeRes = await this.sendCommand(`write ${binary.byteLength}`);
    if (writeSizeRes.isFailure()) return writeSizeRes;

    const writeRes = await this.sendData(binary);
    if (writeRes.isFailure()) return writeRes;
    if (writeRes.value.startsWith("-"))
      return Failure.error("Failed to write.");

    if (option?.autoVerify) {
      const verifyRes = await this.verify(binary);
      if (verifyRes.isFailure()) {
        return Failure.error("Failed to verify.");
      }
    }

    if (option?.execute) {
      await this.sendCommand("execute");
    }
    return Success.value(writeRes.value);
  }

  private async sendData(
    chunk: Uint8Array,
    option?: Partial<{ ignoreResponse: boolean }>
  ): Promise<Result<string, Error>> {
    if (!this.adapter.isConnected()) {
      return Failure.error("Not connected.");
    }

    const send = async (): Promise<Result<string, Error>> => {
      const writerRes = this.getWriter();
      if (writerRes.isFailure()) {
        return writerRes;
      }

      const writer = writerRes.value;

      const request = await this.write(writer, chunk);
      writer.releaseLock();
      if (request.isFailure()) {
        return request;
      }
      if (option?.ignoreResponse) {
        return Success.value("");
      }
      const response = await this.readLine();

      if (response.isFailure()) {
        return response;
      }

      return response;
    };

    const sendJob = send();
    this.jobQueue.push({ job: sendJob, description: "send data" });
    return await sendJob;
  }

  private async completeJobs() {
    for (const job of this.jobQueue) {
      try {
        this.log("Job await:", `"${job.description}"`);
        const res = await job.job;
        this.log("Job succeeded", res);
      } catch (error) {
        this.log("Job failed", error);
      }
    }
    this.jobQueue = [];
  }

  private async close(): Promise<Result<null, Error>> {
    const closeRes = await this.adapter.close();
    if (closeRes.isFailure()) {
      return closeRes;
    }

    return Success.value(null);
  }

  private getWriter(): Result<WritableStreamDefaultWriter<Uint8Array>, Error> {
    const writableRes = this.adapter.getWritable();
    if (writableRes.isFailure()) {
      return writableRes;
    }

    try {
      return Success.value(writableRes.value.getWriter());
    } catch (error) {
      return Failure.error("Failed to get writer.", { cause: error });
    }
  }

  private handleText(text: string): Success<{ event: Event | null }> {
    const last_text = this.buffer.pop() ?? "";
    const texts = (last_text + text).replaceAll("\r\n", "\n").split("\n");
    const event = this.detectEvent(texts.join()).value.event;
    this.buffer.push(...texts);
    this.onListen?.(this.buffer);
    return Success.value({ event });
  }

  private async handleEvent(
    event: Event | null
  ): Promise<Result<null, Error> | null> {
    if (event === "SuccessToEnterWriteMode") {
      return this.onEnterWriteMode();
    }
    if (event === "SuccessToExitWriteMode") {
      return this.onExitWriteMode();
    }
    return null;
  }

  private detectEvent(text: string): Success<{ event: Event | null }> {
    const profile = this.adapter.getProfile();
    if (profile && text.match(profile.keyword.enterWriteMode)) {
      return Success.value({ event: "SuccessToEnterWriteMode" });
    }
    if (profile && text.match(profile.keyword.exitWriteMode)) {
      return Success.value({ event: "SuccessToExitWriteMode" });
    }

    return Success.value({ event: null });
  }
  private async onEnterWriteMode(): Promise<Result<null, Error>> {
    if (!this.adapter.isConnected()) {
      return Failure.error("Not connected.");
    }
    if (this._writeMode) {
      return Failure.error("Already write mode.");
    }

    this._writeMode = true;
    return Success.value(null);
  }

  private async onExitWriteMode(): Promise<Success<null>> {
    this._writeMode = false;
    return Success.value(null);
  }

  private async write(
    writer: WritableStreamDefaultWriter<Uint8Array>,
    chunk: Uint8Array
  ): Promise<Result<null, Error>> {
    const divisionSize = 1024;
    const waitTimeMs = 500;
    const sleep = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    const chunks = new Array(Math.ceil(chunk.length / divisionSize))
      .fill(null)
      .map((_, idx) =>
        chunk.subarray(idx * divisionSize, (idx + 1) * divisionSize)
      );

    try {
      for (const idx of [...chunks.map((_, i) => i)]) {
        await writer.ready;
        await writer.write(chunks[idx]);
        if (idx == chunks.length - 1) break;

        await sleep(waitTimeMs);
      }
      this.log("Writed", { chunk });

      return Success.value(null);
    } catch (error) {
      return Failure.error("Error excepted while writing.", { cause: error });
    } finally {
      writer.releaseLock();
    }
  }

  private async readLine(): Promise<Result<string, Error>> {
    try {
      const removeRes = await this.removeSink();
      if (removeRes.isFailure()) return removeRes;

      const value = await new Promise<string>((resolve, reject) => {
        let line = "";
        const reader = new WritableStream({
          write(chunk) {
            line += chunk;
            if (line.endsWith("\r\n")) {
              resolve(line);
            }
          },
        });

        const setRes = this.setSink(reader);
        if (setRes.isFailure()) reject(setRes);
      });

      const changeRes = await this.changeSink(new WritableStream<string>());
      if (changeRes.isFailure()) return changeRes;

      return Success.value(value);
    } catch (error) {
      return Failure.error("Error excepted while reading.", { cause: error });
    }
  }

  async verify(code: Uint8Array): Promise<Result<void, Error>> {
    const correctHash = calculateCrc8(code);
    const verifyRes = await this.sendCommand("verify");
    if (verifyRes.isFailure()) return verifyRes;

    const targetHash = verifyRes.value.match(
      /^\+OK (?<hash>[0-9a-zA-Z]+)\r?\n$/
    )?.groups?.hash;
    if (!targetHash) {
      this.handleText("\r\n\u001b[31m failed to verify. \r\n");
      return Failure.error("Target hash is not found.");
    }
    this.log(
      "correctHash",
      correctHash,
      "targetHash",
      parseInt(targetHash, 16)
    );
    if (correctHash === parseInt(targetHash, 16)) {
      this.handleText("\r\n\u001b[32m verify succeeded. \u001b[0m\r\n");
      return Success.value(undefined);
    } else {
      this.handleText("\r\n\u001b[31m failed to verify. \r\n");
      return Failure.error("Failed to verify.");
    }
  }

  private async abortStreams(): Promise<Result<void, Error>> {
    try {
      this.sinkAborter?.abort(abortReason);
      await this.sinkClosed?.catch(console.warn);

      this.sourceAborter?.abort(abortReason);
      await this.sourceClosed?.catch(console.warn);

      await this.readable?.cancel().catch(console.warn);

      await this.adapter.cancel();

      return Success.value(undefined);
    } catch (error) {
      return Failure.error("Failure to abort streams.", { cause: error });
    }
  }

  private async changeSink(
    sink: WritableStream<string>
  ): Promise<Result<null, Error>> {
    const removeRes = await this.removeSink();
    if (removeRes.isFailure()) return removeRes;

    const setRes = this.setSink(sink);
    if (setRes.isFailure()) return setRes;

    return Success.value(null);
  }

  private async removeSink(): Promise<Result<null, Error>> {
    if (!this.sinkAborter) {
      return Failure.error("No sink aborter.");
    }

    try {
      this.sinkAborter.abort("removeSink");
      await this.sinkClosed?.catch(console.warn);

      return Success.value(null);
    } catch (error) {
      return Failure.error("Failed to remove sink.", { cause: error });
    }
  }

  private setSink(sink: WritableStream<string>): Result<null, Error> {
    if (!this.readable) {
      return Failure.error("No readable.");
    }

    try {
      this.sinkAborter = new AbortController();
      this.sinkClosed = this.readable.pipeTo(sink, {
        signal: this.sinkAborter.signal,
        preventCancel: true,
      });

      return Success.value(null);
    } catch (error) {
      return Failure.error("Failed to set sink.", { cause: error });
    }
  }
}
