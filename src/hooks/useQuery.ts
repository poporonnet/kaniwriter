import { useMemo } from "react";

export const useQuery = () => {
  return useMemo(() => new URLSearchParams(location.search), []);
};
