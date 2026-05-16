import { CodeHighlight } from "@mantine/code-highlight";
import { Box, Button, Card, Title, useMantineTheme } from "@mantine/core";
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
  const theme = useMantineTheme();

  return (
    <Card
      bg={theme.colors.neutral[0]}
      miw="41rem"
      maw="65rem"
      w="100%"
      mb={isOpen ? "2rem" : "0"}
      withBorder
      bdrs={
        isOpen
          ? "16px"
          : "16px 16px 0px 0px"
      }
      bd="1px solid #cdd7e1"
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
        <Title c={theme.colors.primary[5]} size="1rem">
          {isOpen ? t("ソースコードを非表示") : t("ソースコードを表示")}
        </Title>
      </Button>

      {isOpen && (
        <Box ref={scroll} pos="relative" mt="lg" w="100%">
          <SourceCodeCopyButton text={sourceCode} />
          <Box mah="30rem" style={{ overflow: "auto" }}>
            <CodeHighlight
              code={sourceCode}
              background="#FFF"
              codeColorScheme="github-light"
              language="ruby"
              w="100%"
              styles={{
                code: { padding: 0, lineHeight: "24px" },
              }}
              withCopyButton={false}
            />
          </Box>
        </Box>
      )}
    </Card>
  );
};
