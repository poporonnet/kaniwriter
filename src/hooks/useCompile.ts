import Base64 from "base64-js";
import { useCallback, useState } from "react";
import { Version } from "./useVersions";

export type CompileStatus = {
  status: "idle" | "compile" | "success" | "error";
  errorName?: string;
  errorBody?: string;
};
type Compile = (version: Version) => void;
type CompileResponse =
  | { status: "ok"; binary: string } // `200 OK` コンパイル成功
  | { status: "error"; error: string } // `200 OK` コンパイル失敗
  | {
      status: "invalid id" | "unknown compiler version";
      id: "";
    } // `400 Bad Request`
  | { status: "failed to compile"; id: "" }; //`500 Internal Error`
type CodeResponse = {
  code: string;
};

export const useCompile = (
  id: string | undefined,
  setCode: (code: Uint8Array) => void,
  setSourceCode: (sourceCode: string) => void
): [status: CompileStatus, compile: Compile] => {
  const [status, setStatus] = useState<CompileStatus>({
    status: "idle",
  });

  // 送信したmruby/cのソースコード

  const compile = useCallback(
    async (version: Version) => {
      if (!id) {
        setStatus({
          status: "error",
          errorName: "no id specified",
        });
        return;
      }

      setStatus({ status: "idle" });

      const codeResponse = await fetch(
        `${import.meta.env.VITE_COMPILER_URL}/code/${id}`
      ).catch(() => undefined);
      if (!codeResponse?.ok) {
        setStatus({
          status: "error",
          errorName: "no source code found",
        });
        return;
      }

      // レスポンスから、送信したmruby/cのソースコードを抽出
      const codeResult = (await codeResponse.json()) as CodeResponse;
      setSourceCode(
        new TextDecoder().decode(Base64.toByteArray(codeResult.code))
      );

      setStatus({ status: "compile" });

      const compileResponse = await fetch(
        `${import.meta.env.VITE_COMPILER_URL}/code/${id}/compile`,
        {
          body: JSON.stringify({ version }),
          method: "POST",
        }
      ).catch(() => undefined);
      if (!compileResponse) {
        setStatus({ status: "error", errorName: "fetching compiler failed" });
        return;
      }

      const compileResult: CompileResponse =
        (await compileResponse.json()) as CompileResponse;
      if (compileResult.status == "error") {
        setStatus({
          status: "error",
          errorName: "compile failed",
          errorBody: compileResult.error,
        });
        return;
      }
      if (compileResult.status != "ok") {
        setStatus({ status: "error", errorName: compileResult.status });
        return;
      }

      setCode(Base64.toByteArray(compileResult.binary));
      setStatus({ status: "success" });
    },
    [id, setCode, setSourceCode]
  );

  return [status, compile];
};
