import { FileCopy } from "@mui/icons-material";
import { Box, Button, Card, Typography } from "@mui/joy";
import { useHighlighter } from "hooks/useHighlighter";
import { useNotify } from "hooks/useNotify";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ControlButton } from "./ControlButton";

interface CodeProps {
  sourceCode: string;
}

export const SourceCodeTab = ({ sourceCode }: CodeProps) => {
  const [html, setHtml] = useState<string>("");
  // 送信したmruby/cのソースコードを表示するかどうか
  const [isOpen, setIsOpen] = useState(false);
  const [t] = useTranslation();
  const highlighter = useHighlighter();
  const notify = useNotify();
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
              width: isOpen ? "90%": "100%",
              height: "2rem",
              pr: isOpen ? "3rem" : undefined,
            }}
          >
            <Typography color="primary">
              {isOpen ? t("ソースコードを非表示") : t("ソースコードを表示")}
            </Typography>
          </Button>
          {isOpen && (
            <ControlButton
              label={""}
              icon={<FileCopy />}
              onClick={() => {
                navigator.clipboard.writeText(sourceCode),
                  notify({
                    title: t("コピーしました。"),
                    message: t(
                      "ソースコードをクリップボードにコピーしました。"
                    ),
                    type: "success",
                  });
              }}
              disabled={!sourceCode}
              sx={{
                position: "absolute",
                left: "90%",
                height: "2rem",
              }}
            />
          )}
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
