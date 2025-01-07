import { useMemo } from "react";
import { crc8Calculator } from "../utils/crc8Calculator";

export const useCrc8 = (data?: Uint8Array) => {
  return useMemo(() => crc8Calculator(data), [data]);
};
