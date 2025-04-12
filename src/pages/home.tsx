import {
  Edit as EditIcon,
  FindInPage as FindInPageIcon,
  Flag as FlagIcon,
  Usb as UsbIcon,
  UsbOff as UsbOffIcon,
} from "@mui/icons-material";
import { Box } from "@mui/joy";
import { useCallback, useEffect, useState } from "react";

import { ControlButton } from "components/ControlButton";
import { Log } from "components/Log";
import { SourceCodeTab } from "components/SourceCodeTab";
import { UnsupportedBrowserModal } from "components/UnsupportedBrowserModal";
import { useCompiler } from "hooks/useCompiler";
import { useMrbwrite } from "hooks/useMrbwrite";
import { useOption } from "hooks/useOption";
import { useQuery } from "hooks/useQuery";
import { useTarget } from "hooks/useTarget";
import { useTranslation } from "react-i18next";
import { CommandInput } from "components/CommandInput";

export const Home = () => {
  const [t, i18n] = useTranslation("ns1");
  const query = useQuery();
  const id = query.get("id") ?? undefined;

  const [log, setLog] = useState<string[]>([]);

  const [CompilerCard, { code, sourceCode, compileStatus }] = useCompiler(id);
  const [TargetSelector, { target }] = useTarget((target) =>
    connector.setTarget(target)
  );
  const [OptionList, { autoScroll, autoConnect, autoVerify }] = useOption();

  const { connector, method } = useMrbwrite({
    target,
    log: (message, params) => console.log(message, params),
    onListen: (buffer) => setLog([...buffer]),
  });

  const startConnection = useCallback(
    async (port?: () => Promise<SerialPort>) => {
      const res = await method.connect(
        port ?? (() => navigator.serial.requestPort())
      );
      if (res.isFailure()) return;

      await Promise.all([method.startListen(), method.startEnter(1000)]);
    },
    [method]
  );

  useEffect(() => {
    if (!autoConnect) return;

    const tryAutoConnect = async () => {
      const ports = await navigator.serial.getPorts();
      if (ports.length == 0) return;

      startConnection(async () => ports[0]);
    };

    tryAutoConnect();
  }, [autoConnect, startConnection]);

  useEffect(() => {
    const locale = localStorage.getItem("locale");
    if (!locale) return;

    i18n.changeLanguage(locale);
  }, [i18n]);

  // WebSerialAPIに対応するブラウザかどうかを確認
  const isSupported = "serial" in navigator;
  return (
    <>
      <UnsupportedBrowserModal defaultOpen={!isSupported} />
      <Box
        sx={{
          mb: "0.5rem",
          display: "flex",
          width: "100%",
          minWidth: "30rem",
          maxWidth: "65rem",
          flexDirection: "row",
          flexGrow: "1",
          gap: "1rem",
        }}
      >
        <Box
          sx={{
            marginLeft: "2rem",
            width: "15rem",
            minWidth: "15rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.5rem",
          }}
        >
          <CompilerCard />
          <TargetSelector />
          <OptionList />
        </Box>
        <Box
          sx={{
            minWidth: "25rem",
            display: "flex",
            flexDirection: "column",
            flexGrow: "1",
            gap: "1rem",
          }}
        >
          <Log log={log} autoScroll={autoScroll} />
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "right",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <ControlButton
              label={t("接続")}
              icon={<UsbIcon />}
              onClick={() => startConnection()}
              disabled={!target || connector.isConnected}
            />
            <ControlButton
              label={t("書き込み")}
              icon={<EditIcon />}
              onClick={() => code && method.writeCode(code, { autoVerify })}
              disabled={
                compileStatus.status !== "success" || !connector.isWriteMode
              }
            />
            <ControlButton
              label={t("検証")}
              icon={<FindInPageIcon />}
              onClick={() => code && method.verify(code)}
              disabled={
                compileStatus.status !== "success" || !connector.isWriteMode
              }
            />
            <ControlButton
              label={t("実行")}
              icon={<FlagIcon />}
              onClick={() =>
                method.sendCommand("execute", { ignoreResponse: true })
              }
              disabled={!connector.isWriteMode}
              color="success"
            />
            <ControlButton
              label={t("切断")}
              icon={<UsbOffIcon />}
              onClick={() => method.disconnect()}
              disabled={!connector.isConnected}
              color="danger"
            />
          </Box>
          <CommandInput
            onSubmit={(command) =>
              method.sendCommand(command, { force: true, ignoreResponse: true })
            }
          />
        </Box>
      </Box>
      <SourceCodeTab sourceCode={sourceCode} />
    </>
  );
};
