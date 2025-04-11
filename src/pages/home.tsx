import {
  Edit as EditIcon,
  FindInPage as FindInPageIcon,
  Flag as FlagIcon,
  Usb as UsbIcon,
  UsbOff as UsbOffIcon,
} from "@mui/icons-material";
import { Autocomplete, Box, Input } from "@mui/joy";
import { useCallback, useEffect, useState } from "react";

import { ControlButton } from "components/ControlButton";
import { Log } from "components/Log";
import { SourceCodeTab } from "components/SourceCodeTab";
import { UnsupportedBrowserModal } from "components/UnsupportedBrowserModal";
import { useCompiler } from "hooks/useCompiler";
import { useMrbwrite } from "hooks/useMrbwrite";
import { useQuery } from "hooks/useQuery";
import { useTranslation } from "react-i18next";
import { useTarget } from "hooks/useTarget";
import { useOption } from "hooks/useOption";

// マイコンに送信可能なコマンド
const commands = [
  "version",
  "clear",
  "write",
  "execute",
  "reset",
  "help",
  "showprog",
  "verify",
] as const;

export const Home = () => {
  const [t, i18n] = useTranslation("ns1");
  const query = useQuery();
  const id = query.get("id") ?? undefined;

  // コマンド入力フィールドのエンターキーで確定された現在の値
  const [commandValue, setCommandValue] = useState("");
  // コマンド入力フィールドに現在入力されている文字列
  const [commandInput, setCommandInput] = useState("");
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "right",
            }}
          >
            <Autocomplete
              placeholder={t("コマンド")}
              options={commands}
              variant="plain"
              color="neutral"
              value={commandValue}
              inputValue={commandInput}
              onChange={(_, v) => setCommandValue(v ?? "")}
              onInputChange={(_, v) => setCommandInput(v ?? "")}
              autoHighlight
              autoComplete
              freeSolo
              sx={{
                borderRadius: "0",
                borderBottom: "solid",
                borderWidth: "1px",
                borderColor: "rgba(0, 0, 0, 0.42)",
                width: "12rem",
              }}
            />
            <Input
              type="submit"
              onClick={() =>
                method.sendCommand(commandInput, {
                  force: true,
                  ignoreResponse: true,
                })
              }
              value="Send"
              variant="plain"
              sx={{
                padding: 0,
                borderRadius: 0,
                "--_Input-focusedHighlight": "transparent",
                "::before": {
                  transform: "scaleX(0)",
                  transition: "transform 200ms",
                },
                "::after": {
                  content: "''",
                  position: "absolute",
                  inset: 0,
                  borderBottom: "1px solid rgba(0,0,0,0.42)",
                  transition: "border-color 200ms",
                },
                ":hover::after": {
                  borderBottom: "2px solid black",
                },
                ":is(.Mui-focused)::before": {
                  borderBottom: "2px solid #1976d2",
                  transform: "scaleX(1) translateX(0)",
                },
              }}
            />
          </Box>
        </Box>
      </Box>
      <SourceCodeTab sourceCode={sourceCode} />
    </>
  );
};
