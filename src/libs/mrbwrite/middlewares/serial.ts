import { Failure, Result, Success } from "libs/result";
import { MrbwriteMiddleware } from "../middleware";
import { Profile } from "../profile";

export class MrbwriteSerialMiddleware
  implements MrbwriteMiddleware<SerialPort>
{
  private profile: Profile | undefined;
  private port: SerialPort | undefined;
  private originReader: ReadableStreamDefaultReader<Uint8Array> | undefined;
  private readonly serial: Serial;

  constructor(serial: Serial) {
    this.serial = serial;
  }

  getProfile(): Profile | undefined {
    return this.profile;
  }

  setProfile(profile: Profile): void {
    this.profile = profile;
  }

  isConnected(): boolean {
    return this.port?.connected ?? false;
  }

  async request(option?: { customRequest?: () => Promise<SerialPort> }) {
    if (this.port) {
      return Failure.error("Already has a port.");
    }

    try {
      const request =
        option?.customRequest ?? (() => this.serial.requestPort());
      this.port = await request();
      return Success.value(undefined);
    } catch (error) {
      return Failure.error("Cannot get serial port.", { cause: error });
    }
  }

  async open() {
    if (!this.port) {
      return Failure.error("No port.");
    }
    if (!this.profile) {
      return Failure.error("No profile set.");
    }

    try {
      await this.port.open({ baudRate: this.profile.baudRate });
      return Success.value(undefined);
    } catch (error) {
      return Failure.error("Cannot open serial port.", { cause: error });
    }
  }

  async close(): Promise<Result<void, Error>> {
    if (!this.port) {
      return Failure.error("Not port.");
    }

    try {
      await this.port.close();

      this.port = undefined;

      return Success.value(undefined);
    } catch (error) {
      return Failure.error("Cannot close serial port.", { cause: error });
    }
  }

  getReadable(
    aborter: AbortController
  ): Result<ReadableStream<Uint8Array>, Error> {
    if (!this.port?.readable) {
      return Failure.error("Cannot read serial port.");
    }

    try {
      const start = async (
        controller: ReadableStreamDefaultController<Uint8Array>
      ) => {
        const listenRes = await this.listen(aborter, (value) =>
          controller.enqueue(value)
        );
        if (listenRes.isFailure()) {
          controller.error(listenRes.error);
          aborter.abort(listenRes.error);
          this.port = undefined;
        }
      };
      const cancel = () => {
        this.originReader?.cancel();
        this.originReader?.releaseLock();
      };

      return Success.value(new ReadableStream<Uint8Array>({ start, cancel }));
    } catch (error) {
      return Failure.error("Failed to create readable stream.", {
        cause: error,
      });
    }
  }

  getWritable(): Result<WritableStream<Uint8Array>, Error> {
    if (!this.port?.writable) {
      return Failure.error("Cannot write serial port.");
    }

    return Success.value(this.port.writable);
  }

  async cancel(): Promise<Result<void, Error>> {
    try {
      await Promise.all([
        this.port?.readable?.cancel(),
        this.port?.writable?.abort(),
      ]);

      return Success.value(undefined);
    } catch (error) {
      return Failure.error("Failed to cancel streams.", { cause: error });
    }
  }

  private async listen(
    aborter: AbortController,
    enqueue: (value: Uint8Array) => void
  ): Promise<Result<void, Error>> {
    while (!aborter.signal.aborted) {
      const readable = this.port?.readable;
      if (!readable) {
        return Failure.error("Cannot read serial port.");
      }

      const reader = readable.getReader();
      this.originReader = reader;
      while (true) {
        try {
          const { value, done } = await reader.read();
          if (done) {
            break;
          }

          enqueue(value);
        } catch (error) {
          console.warn(error);
          break;
        }
      }
      reader.releaseLock();
    }

    return Success.value(undefined);
  }
}

export const serialMiddleware = new MrbwriteSerialMiddleware(navigator.serial);
