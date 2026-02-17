import { Autocomplete, Button, Flex } from "@mantine/core";
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
  const [command, setCommand] = useState("");

  const [t] = useTranslation();

  return (
    <Flex
      ml="auto"
      w="fit-content"
      style={{
        height: "2.25rem",
        boxSizing: "border-box",
        borderBottom: "solid 1px rgba(0, 0, 0, 0.42)",
      }}
    >
      <Autocomplete
        data={commands}
        value={command}
        onChange={setCommand}
        placeholder={t("コマンド")}
        variant="unstyled"
        withScrollArea={false}
        clearable
        selectFirstOptionOnChange
        h="100%"
        w="12rem"
        comboboxProps={{
          size: "md",
          shadow: "sm",
          offset: 1,
        }}
        styles={{
          wrapper: {
            height: "100%",
          },
          input: {
            padding: "0 12px",
            fontSize: "1rem",
            height: "100%",
            minHeight: 0,
            border: 0,
          },
          dropdown: {
            overflowY: "auto",
            padding: "0.25rem 0",
            border: 0,
            maxHeight: "40dvh",
          },
          option: {
            padding: "0 0.75rem",
            height: "2.25rem",
            borderRadius: 0,
          },
        }}
      />
      <Button
        onClick={() => onSubmit(command)}
        variant="transparent"
        h="2.25rem"
        p={0}
        size="md"
        bd={0}
        bdrs={0}
        c="neutral.7"
      >
        Send
      </Button>
    </Flex>
  );
};
