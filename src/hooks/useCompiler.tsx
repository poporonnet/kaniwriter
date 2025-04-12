import { CompilerCard } from "components/CompilerCard";
import {
  ComponentType,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { type CompileStatus, useCompile } from "./useCompile";
import { Version, useVersions } from "./useVersions";

type UseCompiler = [
  card: ComponentType,
  {
    code: Uint8Array | undefined;
    sourceCode: string;
    compileStatus: CompileStatus;
  },
];

export const useCompiler = (id: string | undefined): UseCompiler => {
  const [version, setVersion] = useState<Version | undefined>();
  const [versions, getVersionsStatus] = useVersions();
  const [code, setCode] = useState<Uint8Array>();
  const [sourceCode, setSourceCode] = useState<string>("");
  const [compileStatus, compile] = useCompile(id, setCode, setSourceCode);

  const onChangeVersion = useCallback(
    (version: Version) => {
      localStorage.setItem("compilerVersion", version);
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
    if (getVersionsStatus != "success") return;
    const version =
      localStorage.getItem("compilerVersion") ||
      import.meta.env.VITE_COMPILER_VERSION_FALLBACK;
    if (!versions.includes(version)) return;
    onChangeVersion(version);
  }, [versions, getVersionsStatus, onChangeVersion]);

  return [
    () => (
      <CompilerCard
        versions={versions}
        getVersionsStatus={getVersionsStatus}
        version={version}
        compileStatus={compileStatus}
        onChangeVersion={onChangeVersion}
      />
    ),
    results,
  ];
};
