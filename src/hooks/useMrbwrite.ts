import { MrbwriteMiddleware } from "libs/mrbwrite/middleware";
import { MrbwriteController } from "libs/mrbwrite/controller";
import { Result, Success } from "libs/result";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNotify } from "./useNotify";

export type Method<Middleware extends MrbwriteMiddleware<unknown>> = {
  connect: (
    ...props: Parameters<MrbwriteController<Middleware>["connect"]>
  ) => Promise<Result<void, Error>>;
  disconnect: () => Promise<Result<void, Error>>;
  startListen: () => Promise<Result<void, Error>>;
  tryEnterWriteMode: () => Promise<Result<void, Error>>;
  startEnter: (intervalMs: number) => Promise<Result<void, Error>>;
  sendCommand: (
    ...props: Parameters<MrbwriteController<Middleware>["sendCommand"]>
  ) => Promise<Result<void, Error>>;
  writeCode: (
    ...props: Parameters<MrbwriteController<Middleware>["writeCode"]>
  ) => Promise<Result<void, Error>>;
  verify: (
    ...props: Parameters<MrbwriteController<Middleware>["verify"]>
  ) => Promise<Result<void, Error>>;
};

type UseMrbwrite<Middleware extends MrbwriteMiddleware<unknown>> = {
  connector: MrbwriteController<Middleware>;
  method: Method<Middleware>;
};

export const useMrbwrite = <Target>(
  ...params: ConstructorParameters<
    typeof MrbwriteController<MrbwriteMiddleware<Target>>
  >
): UseMrbwrite<MrbwriteMiddleware<Target>> => {
  type Middleware = MrbwriteMiddleware<Target>;

  const [t] = useTranslation("ns1");
  const notify = useNotify();

  // インスタンスは1つだけ作られる
  // biome-ignore lint: correctness/useExhaustiveDependencies
  const connector = useMemo(() => new MrbwriteController(...params), []);

  const notifyError = useCallback(
    (title: string, error: Error) =>
      notify({
        title,
        message: `${error.cause}`,
        type: "danger",
      }),
    [notify]
  );

  const startListen = useCallback(async (): Promise<Result<void, Error>> => {
    const res = await connector.startListen();
    if (res.isFailure()) {
      notifyError(t("受信中にエラーが発生しました。"), res.error);
      console.error(res.error);
      return res;
    }
    return Success.value(undefined);
  }, [t, connector, notifyError]);

  const connect = useCallback(
    async (
      ...props: Parameters<MrbwriteController<Middleware>["connect"]>
    ): Promise<Result<void, Error>> => {
      const res = await connector.connect(...props);
      if (res.isFailure()) {
        notifyError(t("ポートを取得できませんでした。"), res.error);
        console.error(res.error);
        return res;
      }
      return Success.value(undefined);
    },
    [t, connector, notifyError]
  );

  const disconnect = useCallback(async (): Promise<Result<void, Error>> => {
    const res = await connector.disconnect();
    if (res.isFailure()) {
      notifyError(t("切断中にエラーが発生しました。"), res.error);
      console.error(res.error);
      return res;
    }
    return Success.value(undefined);
  }, [t, connector, notifyError]);

  const tryEnterWriteMode = useCallback(async (): Promise<
    Result<void, Error>
  > => {
    const res = await connector.tryEnterWriteMode();
    if (res.isFailure()) {
      console.error(res.error);
      return res;
    }
    return Success.value(undefined);
  }, [connector]);

  const startEnter = useCallback(
    async (intervalMs: number): Promise<Result<void, Error>> => {
      if (connector.isWriteMode) return Success.value(undefined);

      return new Promise<Result<void, Error>>((resolve, reject) => {
        const interval = setInterval(async () => {
          const res = await tryEnterWriteMode();
          if (res.isFailure()) {
            clearInterval(interval);
            reject(res);
            return;
          }
          if (connector.isWriteMode) {
            clearInterval(interval);
            resolve(Success.value(undefined));
            return;
          }
        }, intervalMs);
      });
    },
    [connector, tryEnterWriteMode]
  );

  const sendCommand = useCallback(
    async (
      ...props: Parameters<MrbwriteController<Middleware>["sendCommand"]>
    ): Promise<Result<void, Error>> => {
      const res = await connector.sendCommand(...props);
      if (res.isFailure()) {
        notifyError(t("送信中にエラーが発生しました。"), res.error);
        console.error(res.error);
        return res;
      }
      return Success.value(undefined);
    },
    [t, connector, notifyError]
  );

  const writeCode = useCallback(
    async (
      ...props: Parameters<MrbwriteController<Middleware>["writeCode"]>
    ): Promise<Result<void, Error>> => {
      const res = await connector.writeCode(...props);
      if (res.isFailure()) {
        notifyError(t("書き込み中にエラーが発生しました。"), res.error);
        console.error(res.error);
        return res;
      }
      return Success.value(undefined);
    },
    [t, connector, notifyError]
  );

  const verify = useCallback(
    async (
      ...props: Parameters<MrbwriteController<Middleware>["verify"]>
    ): Promise<Result<void, Error>> => {
      const res = await connector.verify(...props);
      if (res.isFailure()) {
        notifyError("検証に失敗しました。", res.error);
        console.error(res.error);
        return res;
      }

      notify({
        title: "検証に成功しました。",
        message: "プログラムは正しく書き込まれています。",
        type: "success",
        autoCloseMs: 5000,
      });
      return res;
    },
    [connector, notify, notifyError]
  );

  const method = useMemo(
    (): Method<Middleware> => ({
      connect,
      disconnect,
      startListen,
      tryEnterWriteMode,
      startEnter,
      sendCommand,
      writeCode,
      verify,
    }),
    [
      connect,
      disconnect,
      startListen,
      tryEnterWriteMode,
      startEnter,
      sendCommand,
      writeCode,
      verify,
    ]
  );

  return {
    connector,
    method,
  };
};
