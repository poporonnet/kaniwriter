import { Target, targets } from "./mrubyWriterConnector";

export const isTarget = (value: unknown): value is Target => {
  return (
    typeof value == "string" && (targets as readonly string[]).includes(value)
  );
};
