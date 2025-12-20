import { Result } from "libs/result";
import { MrbwriteProfile } from "./profile";

export interface MrbwriteMiddleware<Device> {
  getProfile(): MrbwriteProfile | undefined;
  setProfile(profile: MrbwriteProfile | undefined): void;

  isConnected(): boolean;

  request(option?: {
    customRequest?: () => Promise<Device>;
  }): Promise<Result<void, Error>>;
  open(): Promise<Result<void, Error>>;
  close(): Promise<Result<void, Error>>;

  getReadable(
    aborter: AbortController
  ): Result<ReadableStream<Uint8Array>, Error>;
  getWritable(): Result<WritableStream<Uint8Array>, Error>;

  cancel(): Promise<Result<void, Error>>;
}

export { serialMiddleware } from "./middlewares/serial";
