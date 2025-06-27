import { useCallback, useEffect, useState } from "react";

export type Version = string;
export type Status = "idle" | "load" | "success" | "error";
type VersionsResponse = { version: Version }[];

export const useVersions = (): [versions: Version[], status: Status] => {
  const [versions, setVersions] = useState<Version[]>([]);
  const [status, setStatus] = useState<Status>("idle");

  const getVersions = useCallback(async () => {
    setStatus("load");
    const response = await fetch(
      `${import.meta.env.VITE_COMPILER_URL}/versions`
    ).catch(() => undefined);
    if (!response?.ok) {
      setVersions([]);
      setStatus("error");
      return;
    }

    const versionsData = await response
      .json()
      .then((json) => json as VersionsResponse)
      .catch(() => undefined);
    if (!versionsData) {
      setVersions([]);
      setStatus("error");
      return;
    }

    setVersions(versionsData.map((record) => record.version));
    setStatus("success");
  }, []);

  useEffect(() => {
    getVersions();
  }, [getVersions]);

  return [versions, status];
};
