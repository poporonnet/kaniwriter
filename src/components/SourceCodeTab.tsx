import { Box, Card, Button, Typography } from "@mui/joy";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHighlighter } from "hooks/useHighlighter";

interface CodeProps {
  sourceCode: string;
}

export const SourceCodeTab = ({ sourceCode }: CodeProps) => {
  const [html, setHtml] = useState<string>("");
  // 送信したmruby/cのソースコードを表示するかどうか
  const [isOpen, setIsOpen] = useState(false);
  const [t] = useTranslation();
  const highlighter = useHighlighter();

  // ソースコードをシンタックスハイライト付きのHTMLに変換
  useEffect(() => {
    if (!highlighter) return;
    const html = highlighter.codeToHtml(sourceCode, {
      lang: "ruby",
      theme: "github-light",
    });
    setHtml(html);
  }, [sourceCode, highlighter]);

  return (
    <Box
      sx={{
        minWidth: "45rem",
        maxWidth: "65rem",
        width: "max(100vw, 100dvw, 45rem)",
        mb: isOpen ? "2rem" : "0",
      }}
    >
      <Card
        sx={{
          borderRadius: isOpen ? "1rem" : "1rem 1rem 0 0",
          margin: "0 2rem",
        }}
      >
        <Button
          sx={{
            height: "2rem",
          }}
          variant="plain"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Typography
            fontFamily={"'M PLUS Rounded 1c', sans-serif"}
            color="primary"
          >
            {isOpen ? t("ソースコードを非表示") : t("ソースコードを表示")}
          </Typography>
        </Button>

        {isOpen && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              maxHeight: "30rem",
              overflow: "auto",
            }}
          >
            <div
              style={{
                width: "100%",
                overflowX: "scroll",
              }}
              dangerouslySetInnerHTML={{ __html: html }}
            ></div>
          </Box>
        )}
      </Card>
    </Box>
  );
};
