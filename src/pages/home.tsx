import { Box } from "@mui/joy";
import { useCallback, useEffect, useState } from "react";

import { CommandInput } from "components/CommandInput";
import { Log } from "components/Log";
import { SourceCodeTab } from "components/SourceCodeTab";
import { UnsupportedBrowserModal } from "components/UnsupportedBrowserModal";
import { useCompiler } from "hooks/useCompiler";
import { useControlButtons } from "hooks/useControlButtons";
import { useMrbwrite } from "hooks/useMrbwrite";
import { useOption } from "hooks/useOption";
import { useQuery } from "hooks/useQuery";
import { useTarget } from "hooks/useTarget";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { i18n } = useTranslation("ns1");
  const query = useQuery();
  const id = query.get("id") ?? undefined;

  const [log, setLog] = useState<string[]>([]);

  const [CompilerCard, { code, sourceCode, compileStatus }] = useCompiler(id);
  const [TargetSelector, { target }] = useTarget((target) =>
    connector.setTarget(target)
  );
  const [OptionList, option] = useOption();

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

  const [ControlButtons] = useControlButtons(
    code,
    target,
    compileStatus,
    option,
    connector,
    method,
    startConnection
  );

  useEffect(() => {
    if (!option.autoConnect) return;

    const tryAutoConnect = async () => {
      const ports = await navigator.serial.getPorts();
      console.log(ports);
      if (ports.length == 0) return;

      startConnection(async () => ports[0]);
    };

    tryAutoConnect();
  }, [option.autoConnect, startConnection]);

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
          display: "flex",
          width: "100%",
          minWidth: "30rem",
          maxWidth: "65rem",
          flexGrow: "1",
          gap: "1rem",
          alignSelf: "center",
        }}
      >
        <Box
          sx={{
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
          <Log log={log} autoScroll={option.autoScroll} />
          <ControlButtons />
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

export default Home;
