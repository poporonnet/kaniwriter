import { useMemo } from "react";
import { calculateCrc8 } from "../utils/calculateCrc8";

export const useCrc8 = (data?: Uint8Array) =>
  useMemo(() => calculateCrc8(data), [data]);
