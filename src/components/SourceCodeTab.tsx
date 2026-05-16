import { CodeHighlight } from "@mantine/code-highlight";
import { Box, Button, Card, Title } from "@mantine/core";
import { SourceCodeCopyButton } from "components/SourceCodeCopyButton";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

interface CodeProps {
  sourceCode: string;
  disable: boolean;
}

export const SourceCodeTab = ({ sourceCode, disable }: CodeProps) => {
  const scroll = useCallback((instance: HTMLDivElement | null) => {
    instance?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, []);
  // 送信したmruby/cのソースコードを表示するかどうか
  const [isOpen, setIsOpen] = useState(false);
  const [t] = useTranslation();

  return (
    <Card
      bg="neutral.0"
      miw="41rem"
      maw="65rem"
      w="100%"
      mb={isOpen ? "2rem" : "0"}
      withBorder
      bdrs={isOpen ? "16px" : "16px 16px 0px 0px"}
      bd="1px solid neutral.3"
    >
      <Button
        variant="subtle"
        onClick={() => setIsOpen(!isOpen)}
        h="2.2rem"
        bg={disable ? "transparent" : ""}
        disabled={disable}
        pt={6}
        pb={6}
        m={isOpen ? "0 0 1rem 0" : "0"}
      >
        <Title c="primary.5" size="1rem">
          {isOpen ? t("ソースコードを非表示") : t("ソースコードを表示")}
        </Title>
      </Button>

      {isOpen && (
        <Box ref={scroll} pos="relative" mt="lg" w="100%">
          <SourceCodeCopyButton text={sourceCode} />
          <CodeHighlight
            code={sourceCode}
            background="neutral.0"
            codeColorScheme="github-light"
            language="ruby"
            w="100%"
            styles={{
              scrollarea: {
                maxHeight: "30rem",
              },
              code: {
                padding: 0,
                lineHeight: "24px",
                fontSize: "16px",
                backgroundColor: "#fff",
              },
            }}
            ff='"Noto Sans Mono", monospace'
            fz="16px"
            withCopyButton={false}
          />
        </Box>
      )}
    </Card>
  );
};
