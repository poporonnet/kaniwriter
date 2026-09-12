import {
  type ComponentType,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CompilerCard } from "#/components/CompilerCard";
import { type CompileStatus, useCompile } from "./useCompile";
import { useVersions, type Version } from "./useVersions";

type UseCompiler = [
  card: ComponentType<{ onClickOpenError: () => void }>,
  {
    code: Uint8Array[] | undefined;
    sourceCode: string[];
    compileStatus: CompileStatus;
  },
];

export const useCompiler = (
  id: string | undefined,
  queryVersion: string | undefined
): UseCompiler => {
  const [version, setVersion] = useState<Version | undefined>();
  const [versions, getVersionsStatus] = useVersions();
  const [code, setCode] = useState<Uint8Array[]>();
  const [sourceCode, setSourceCode] = useState<string[]>([]);
  const [compileStatus, compile] = useCompile(id, setCode, setSourceCode);

  const onChangeVersion = useCallback(
    (version: Version) => {
      localStorage.setItem("compilerVersion", version);
      const url = new URL(location.href);
      url.searchParams.set("version", version);
      history.replaceState(null, "", url);
      setVersion(version);
      compile(version);
    },
    [compile]
  );

  const results = useMemo(
    () => ({ code, sourceCode, compileStatus }),
    [code, sourceCode, compileStatus]
  );

  useEffect(() => {
    if (getVersionsStatus !== "success") return;
    if (version !== undefined) return;
    const nextVersion =
      queryVersion ??
      localStorage.getItem("compilerVersion") ??
      import.meta.env.VITE_COMPILER_VERSION_FALLBACK;
    if (!versions.includes(nextVersion)) return;
    if (queryVersion) {
      setVersion(nextVersion);
      compile(nextVersion);
      return;
    }
    onChangeVersion(nextVersion);
  }, [
    versions,
    getVersionsStatus,
    onChangeVersion,
    queryVersion,
    compile,
    version,
  ]);

  return [
    ({ onClickOpenError }: { onClickOpenError: () => void }) => (
      <CompilerCard
        versions={versions}
        getVersionsStatus={getVersionsStatus}
        version={version}
        compileStatus={compileStatus}
        onChangeVersion={onChangeVersion}
        onClickOpenError={onClickOpenError}
      />
    ),
    results,
  ];
};
