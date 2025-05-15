import { FileCopy } from "@mui/icons-material";
import { Box, Button, Card, Snackbar, Typography } from "@mui/joy";
import { useHighlighter } from "hooks/useHighlighter";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
interface CodeProps {
  sourceCode: string;
}

export const SourceCodeTab = ({ sourceCode }: CodeProps) => {
  const [html, setHtml] = useState<string>("");
  // 送信したmruby/cのソースコードを表示するかどうか
  const [isOpen, setIsOpen] = useState(false);
  const [t] = useTranslation();
  const highlighter = useHighlighter();

  const handleCopy = () => {
    if (!sourceCode) return;
    navigator.clipboard.writeText(sourceCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ソースコードをシンタックスハイライト付きのHTMLに変換
  useEffect(() => {
    if (!highlighter) return;
    const html = highlighter.codeToHtml(sourceCode, {
      lang: "ruby",
      theme: "github-light",
    });
    setHtml(html);
  }, [sourceCode, highlighter]);
  const [copied, setCopied] = useState(false);

  return (
    <Box
      sx={{
        minWidth: "41rem",
        maxWidth: "65rem",
        width: "100%",
        mb: isOpen ? "2rem" : "0",
      }}
    >
      <Card
        sx={{
          borderRadius: isOpen ? "1rem" : "1rem 1rem 0 0",
        }}
      >
        <Box
          sx={{
            display: "flex",
          }}
        >
          <Button
            variant="plain"
            onClick={() => setIsOpen(!isOpen)}
            sx={{
              width: "100%",
              height: "2rem",
              pr: isOpen ? "3rem" : undefined,
            }}
          >
            <Typography color="primary">
              {isOpen ? t("ソースコードを非表示") : t("ソースコードを表示")}
            </Typography>
          </Button>
        </Box>

        {isOpen && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              maxHeight: "30rem",
              overflow: "auto",
            }}
          >
            <Button
              onClick={() => handleCopy()}
              disabled={!sourceCode}
              sx={{
                position: "absolute",
                right: "2.5rem",
                height: "2rem",
                minWidth: "2rem",
                padding: 0,
                backgroundColor: "transparent",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
              }}
              variant="plain"
            >
              <FileCopy />
              <Snackbar
                open={copied}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                sx={{
                  position: "absolute",
                  top: "3rem",
                }}
              >
                {t("コピーしました")}
              </Snackbar>
            </Button>

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
