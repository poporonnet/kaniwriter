import { WritableStreamDefaultWriter } from "stream/web";
import { Result, Success, Failure } from "./result";

export const targets = ["ESP32", "RBoard"] as const;
export type Target = (typeof targets)[number];

type Logger = (message: string, ...params: unknown[]) => void;
type Listener = (buffer: string[]) => void;

type Reader = ReadableStreamDefaultReader<Uint8Array>;
type Writer = WritableStreamDefaultWriter<Uint8Array>;
type Event = "AttemptToEnterWriteMode" | "SuccessToExitWriteMode";
type Job = { job: Promise<Result<unknown, Error>>; description: string };

const baudRates: Record<Target, number> = {
  ESP32: 115200,
  RBoard: 19200,
} as const;

const enterWriteModeKeyword: Record<Target, RegExp> = {
  ESP32: /mrubyc-esp32: Please push Enter key x 2 to mrbwite mode/,
  RBoard: /mruby\/c v\d.\d start./,
} as const;

const exitWriteModeKeyword: Record<Target, RegExp> = {
  ESP32: /mrubyc-esp32: End mrbwrite mode/,
  RBoard: /\+OK Execute mruby\/c./,
} as const;

export class MrubyWriterConnector {
  private port: SerialPort | undefined;
  private log: Logger;
  private onListen: Listener | undefined;
  private mainReadable: ReadableStream<Uint8Array> | undefined;
  private subReadable: ReadableStream<Uint8Array> | undefined;
  private mainReadableStreamClosed: Promise<void> | undefined;
  private aborter: AbortController | undefined;
  private _writeMode: boolean;
  private encoder: TextEncoder;
  private decoder: TextDecoder;
  private buffer: string[];
  private target: Target | undefined;
  private currentSubReader: Reader | undefined;
  private jobQueue: Job[];

  constructor(config: { target?: Target; log: Logger; onListen?: Listener }) {
    this.target = config.target;
    this.log = config.log;
    this.onListen = config.onListen;
    this.buffer = [];
    this._writeMode = false;
    this.encoder = new TextEncoder();
    this.decoder = new TextDecoder();
    this.jobQueue = [];
  }

  public get isConnected(): boolean {
    return this.port != null;
  }

  public get isWriteMode(): boolean {
    return this._writeMode;
  }

  setTarget(target: Target) {
    this.target = target;
  }

  async connect(port: () => Promise<SerialPort>): Promise<Result<null, Error>> {
    if (this.port) {
      return Failure.error("Already connected.");
    }

    try {
      this.handleText("\r\n\u001b[32m> try to connect...\u001b[0m\r\n");
      this.port = await port();
      const res = await this.open();
      if (res.isFailure()) {
        this.port = undefined;
        this.handleText(
          "\r\n\u001b[31m> failed to open serial port.\u001b[0m\r\n"
        );
        return Failure.error("Failed to open serial port.");
      }

      this.handleText("\r\n\u001b[32m> connection established.\u001b[0m\r\n");
      return Success.value(null);
    } catch (error) {
      this.port = undefined;
      this.handleText("\r\n\u001b[31m> failed to connect.\u001b[0m\r\n");
      return Failure.error("Cannot get serial port.", { cause: error });
    }
  }

  async disconnect(): Promise<Result<null, Error>> {
    if (!this.port) {
      return Failure.error("Not connected.");
    }

    try {
      this.handleText("\r\n\u001b[32m> try to disconnect...\u001b[0m\r\n");

      this.aborter?.abort(new Error("disconnect is called."));
      await this.mainReadableStreamClosed?.catch(() => undefined);

      await this.currentSubReader?.cancel(() => undefined);
      this.currentSubReader?.releaseLock();

      await this.mainReadable?.cancel().catch(() => undefined);
      await this.subReadable?.cancel().catch(() => undefined);
      await this.port.writable?.abort().catch(() => undefined);

      const res = await this.close();
      if (res.isFailure()) {
        this.handleText(
          "\r\n\u001b[31m> failed to close serial port.\u001b[0m\r\n"
        );
        return res;
      }

      this.port = undefined;
      this._writeMode = false;

      this.handleText(
        "\r\n\u001b[32m> successfully disconnected.\u001b[0m\r\n"
      );
      return Success.value(null);
    } catch (error) {
      this.handleText(
        "\r\n\u001b[31m> failed to close serial port.\u001b[0m\r\n"
      );
      return Failure.error("Cannot disconnect serial port.", { cause: error });
    }
  }

  async startListen(): Promise<Result<null, Error>> {
    if (!this.port) {
      return Failure.error("No port.");
    }
    if (!this.port.readable) {
      return Failure.error("Cannot read serial port.");
    }
    if (!this.port.writable) {
      return Failure.error("Cannot write serial port.");
    }

    try {
      const [mainReadable, subReadable] = this.port.readable.tee();
      this.mainReadable = mainReadable;
      this.subReadable = subReadable;
      this.aborter = new AbortController();

      const decode = (data: Uint8Array) => this.decoder.decode(data);
      const handleText = (text: string) => this.handleText(text);
      const log = this.log;
      const handleEvent = (event: Event | null) => this.handleEvent(event);
      const decodeStream = new TransformStream<Uint8Array, string>({
        transform(chunk, controller) {
          controller.enqueue(decode(chunk));
        },
      });
      const logStream = new WritableStream<string>({
        async write(chunk) {
          log("Received", { chunk });

          const event = handleText(chunk);
          if (event.value.event) log("Event detected", event.value);

          const res = await handleEvent(event.value.event);
          if (res) log("Event handled", res);
        },
      });

      this.mainReadableStreamClosed = mainReadable
        .pipeThrough(decodeStream, this.aborter)
        .pipeTo(logStream, this.aborter);

      while (this.port.readable) {
        if (this.aborter.signal.aborted) {
          return Success.value(null);
        }
        this.currentSubReader = subReadable.getReader();
        await this.read(this.currentSubReader);
        await this.completeJobs();
        this.currentSubReader.releaseLock();
      }
    } catch (error) {
      return Failure.error("Error excepted while reading.", { cause: error });
    } finally {
      this.currentSubReader?.releaseLock();
      if (!this.aborter?.signal.aborted) {
        await this.close();
      }
    }

    return Failure.error("Reader is canceled.");
  }

  async sendCommand(
    command: string,
    option?: { force: boolean }
  ): Promise<Result<string, Error>> {
    if (!this.port) {
      return Failure.error("No port.");
    }
    if (!option?.force && !this._writeMode) {
      return Failure.error("Not write mode now.");
    }

    await this.completeJobs();

    this.handleText(`\r\n> ${command}\r\n`);
    console.log("Send", { command });

    return this.sendData(this.encoder.encode(`${command}\r\n`));
  }

  async writeCode(
    binary: Uint8Array,
    option?: { execute: boolean }
  ): Promise<Result<null, Error>> {
    if (!this.port) {
      return Failure.error("No port.");
    }
    if (!this._writeMode) {
      return Failure.error("Not write mode now.");
    }

    await this.completeJobs();

    const clearRes = await this.sendCommand("clear");
    if (clearRes.isFailure()) return clearRes;

    console.log(clearRes);
    const writeSizeRes = await this.sendCommand(`write ${binary.byteLength}`);
    if (writeSizeRes.isFailure()) return writeSizeRes;

    const writeRes = await this.sendData(binary);
    if (writeRes.isFailure()) return writeRes;

    if (option?.execute) {
      await this.sendCommand("execute");
    }

    return Success.value(null);
  }

  private async sendData(chunk: Uint8Array): Promise<Result<string, Error>> {
    if (!this.port) {
      return Failure.error("No port.");
    }

    const send = async (): Promise<Result<string, Error>> => {
      const readerRes = this.getSubReader();
      const writerRes = this.getWriter();
      if (readerRes.isFailure()) {
        return readerRes;
      }
      if (writerRes.isFailure()) {
        return writerRes;
      }

      this.currentSubReader = readerRes.value;
      const writer = writerRes.value;

      const request = await this.write(writer, chunk);
      if (request.isFailure()) {
        return request;
      }

      const response = await this.readLine(this.currentSubReader);
      if (response.isFailure()) {
        return response;
      }
      if (!response.value.startsWith("+")) {
        return Failure.error("Failed to enter write mode.", {
          cause: response,
        });
      }

      this.currentSubReader.releaseLock();
      writer.releaseLock();

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

  private async open(): Promise<Result<null, Error>> {
    if (!this.port) {
      return Failure.error("No port.");
    }
    if (!this.target) {
      return Failure.error("No target selected.");
    }

    try {
      await this.port.open({ baudRate: baudRates[this.target] });
      return Success.value(null);
    } catch (error) {
      return Failure.error("Failed to open serial port.", { cause: error });
    }
  }

  private async close(): Promise<Result<null, Error>> {
    if (!this.port) {
      return Failure.error("No port.");
    }

    try {
      await this.port.close();
      return Success.value(null);
    } catch (error) {
      return Failure.error("Failed to close serial port.", { cause: error });
    }
  }

  private getSubReader(): Result<Reader, Error> {
    if (!this.port) {
      return Failure.error("No port.");
    }
    if (!this.subReadable) {
      return Failure.error("Cannot read serial port.");
    }

    try {
      this.currentSubReader?.releaseLock();
      return Success.value(this.subReadable.getReader());
    } catch (error) {
      return Failure.error("Failed to get reader.", { cause: error });
    }
  }

  private getWriter(): Result<Writer, Error> {
    if (!this.port) {
      return Failure.error("No port.");
    }
    if (!this.port.writable) {
      return Failure.error("Cannot write serial port.");
    }

    try {
      return Success.value(this.port.writable.getWriter());
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
    if (event === "AttemptToEnterWriteMode") {
      return this.onAttemptEnterWriteMode();
    }
    if (event === "SuccessToExitWriteMode") {
      return this.onExitWriteMode();
    }
    return null;
  }

  private detectEvent(text: string): Success<{ event: Event | null }> {
    if (this.target && text.match(enterWriteModeKeyword[this.target])) {
      return Success.value({ event: "AttemptToEnterWriteMode" });
    }
    if (this.target && text.match(exitWriteModeKeyword[this.target])) {
      return Success.value({ event: "SuccessToExitWriteMode" });
    }

    return Success.value({ event: null });
  }

  private async onAttemptEnterWriteMode(): Promise<Result<null, Error>> {
    if (!this.port) {
      return Failure.error("No port.");
    }
    if (this._writeMode) {
      return Failure.error("Already write mode.");
    }
    if (!this.subReadable) {
      return Failure.error("Cannot read serial port.");
    }
    if (!this.port.writable) {
      return Failure.error("Cannot write serial port.");
    }

    const enter = async (): Promise<Result<null, Error>> => {
      const response = await this.sendData(this.encoder.encode("\r\n\r\n"));
      if (response.isFailure()) {
        return response;
      }
      if (!response.value.includes("+OK mruby/c")) {
        return Failure.error("Cannot enter write mode");
      }

      this._writeMode = true;
      return Success.value(null);
    };

    const enterJob = enter();
    this.jobQueue.push({
      job: enterJob,
      description: "attempt to enter write mode",
    });
    return await enterJob;
  }

  private async onExitWriteMode(): Promise<Success<null>> {
    this._writeMode = false;
    return Success.value(null);
  }

  private async read(reader: Reader): Promise<Result<string, Error>> {
    try {
      const { done, value } = await reader.read();
      if (done) {
        return Failure.error("Reader is canceled.");
      }

      return Success.value(this.decoder.decode(value));
    } catch (error) {
      return Failure.error("Error excepted while reading.", { cause: error });
    }
  }

  private async write(
    writer: Writer,
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

  private async readLine(reader: Reader): Promise<Result<string, Error>> {
    let line = "";
    while (!line.endsWith("\r\n")) {
      const res = await this.read(reader);
      if (res.isFailure()) return res;

      line += res.value;
    }

    return Success.value(line);
  }
}
