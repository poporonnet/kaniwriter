import { Box } from "@mui/joy";
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
import { Target } from "libs/mrbwrite/controller";
import { serialMiddleware } from "libs/mrbwrite/middleware";
import { esp32, MrbwriteProfile, rboard } from "libs/mrbwrite/profile";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { i18n } = useTranslation("ns1");
  const query = useQuery();
  const id = query.get("id") ?? undefined;

  const [log, setLog] = useState<string[]>([]);

  const [CompilerCard, { code, sourceCode, compileStatus }] = useCompiler(id);
  const getProfile = useCallback((target: Target): MrbwriteProfile => {
    switch (target) {
      case "ESP32":
        return esp32;
      case "RBoard":
        return rboard;
    }
  }, []);
  const [TargetSelector, { target }] = useTarget((target) =>
    connector.setProfile(getProfile(target))
  );
  const [OptionList, option] = useOption();

  const { connector, method } = useMrbwrite(
    {
      profile: target && getProfile(target),
      log: (message, params) => console.log(message, params),
      onListen: (buffer) => setLog([...buffer]),
    },
    serialMiddleware
  );

  const startConnection = useCallback(
    async (customRequest?: () => Promise<SerialPort>) => {
      const res = await method.connect({ customRequest });
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
          minHeight: "35rem",
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
      <SourceCodeTab sourceCode={sourceCode} disable={!id} />
    </>
  );
};

export default Home;
