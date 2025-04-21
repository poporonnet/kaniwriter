import { Autocomplete, Box, Input } from "@mui/joy";
import { useState } from "react";
import { useTranslation } from "react-i18next";

// Mrbwriteで定義されているコマンド
const commands = [
  "version",
  "clear",
  "write",
  "execute",
  "reset",
  "help",
  "showprog",
  "verify",
];

export const CommandInput = ({
  onSubmit,
}: {
  onSubmit: (command: string) => void;
}) => {
  // コマンド入力フィールドのエンターキーで確定された現在の値
  const [commandValue, setCommandValue] = useState("");
  // コマンド入力フィールドに現在入力されている文字列
  const [commandInput, setCommandInput] = useState("");

  const [t] = useTranslation();

  return (
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
        onClick={() => onSubmit(commandInput)}
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
  );
};
