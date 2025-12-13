import { Result } from "libs/result";
import { Profile } from "./profile";

export interface MrbwriteAdapter<Device> {
  getProfile(): Profile | undefined;
  setProfile(profile: Profile | undefined): void;

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

export { serialAdapter } from "./adapters/serial";
