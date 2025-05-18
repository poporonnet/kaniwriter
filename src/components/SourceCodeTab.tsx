import { FileCopy } from "@mui/icons-material";
import { Box, Button, Card, IconButton, Snackbar, Typography } from "@mui/joy";
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
    setShowCopied(true);
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
  const [showCopied, setShowCopied] = useState(false);

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
        <Button
          variant="plain"
          onClick={() => setIsOpen(!isOpen)}
          sx={{
            height: "2rem",
          }}
        >
          <Typography color="primary">
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
            <IconButton
              onClick={() => handleCopy()}
              disabled={!sourceCode}
              color="primary"
              sx={{
                position: "absolute",
                right: "2.5rem",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
              }}
              variant="plain"
            >
              <FileCopy />
              <Snackbar
                open={showCopied}
                onClose={() => setShowCopied(false)}
                autoHideDuration={2000}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                sx={{
                  position: "absolute",
                  top: "2rem",
                  minWidth: "9rem",
                  px: "1rem",
                  py: "0.5rem",
                }}
              >
                {t("コピーしました")}
              </Snackbar>
            </IconButton>

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
