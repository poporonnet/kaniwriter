import { CodeHighlight } from "@mantine/code-highlight";
import { Button, Card, Title } from "@mantine/core";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface CodeProps {
  sourceCode: string;
  disable: boolean;
}

export const SourceCodeTab = ({ sourceCode, disable }: CodeProps) => {
  // 送信したmruby/cのソースコードを表示するかどうか
  const [isOpen, setIsOpen] = useState(false);
  const [t] = useTranslation();

  return (
    <Card
      miw="41rem"
      maw="65rem"
      w="100%"
      mb={isOpen ? "2rem" : "0"}
      radius={isOpen ? "1rem" : "1rem 1rem 0 0"}
      withBorder
    >
      <Button
        variant="subtle"
        onClick={() => setIsOpen(!isOpen)}
        h="2rem"
        bg={disable ? "transparent" : ""}
        disabled={disable}
        pt={6}
        pb={6}
        m={isOpen ? "0 0 1rem 0" : "0"}
      >
        <Title c="inherit" order={5}>
          {isOpen ? t("ソースコードを非表示") : t("ソースコードを表示")}
        </Title>
      </Button>

      {isOpen && (
        <CodeHighlight
          code={sourceCode}
          language="ruby"
          w="100%"
          mah="30rem"
          style={{ overflow: "auto" }}
          copiedLabel={t("コピーしました")}
          copyLabel={t("コピーする")}
        />
      )}
    </Card>
  );
};
