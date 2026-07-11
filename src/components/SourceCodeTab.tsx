import { Box, Button, Card, IconButton, Snackbar, Typography } from "@mui/joy";
import { transformerNotationErrorLevel } from "@shikijs/transformers";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { MdFileCopy as FileCopyIcon } from "react-icons/md";
import { useHighlighter } from "#/hooks/useHighlighter";
import { embedError } from "#/utils/shikiEmbedError";
import { transformerErrorMessage } from "#/utils/shikiTransformer";

interface CodeProps {
  source: { code: string; error?: string };
  opened: boolean;
  toggle: () => void;
  disable: boolean;
}

export const SourceCodeTab = ({
  source,
  opened,
  toggle,
  disable,
}: CodeProps) => {
  const [html, setHtml] = useState<string>("");
  const [t] = useTranslation();
  const highlighter = useHighlighter();

  const handleCopy = () => {
    if (!source.code) return;
    navigator.clipboard.writeText(source.code);
    setShowCopied(true);
  };

  const scroll = useCallback((instance: HTMLDivElement | null) => {
    instance?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, []);
  // ソースコードをシンタックスハイライト付きのHTMLに変換
  useEffect(() => {
    if (!highlighter) return;
    const code = embedError(source.code, source.error ?? ""); // エラーメッセージをソースコードに埋め込む
    const html = highlighter.codeToHtml(code, {
      lang: "ruby",
      theme: "github-light",
      mergeWhitespaces: false,
      transformers: [
        transformerNotationErrorLevel(),
        transformerErrorMessage(),
      ],
    });
    setHtml(html);
  }, [source.code, source.error, highlighter]);
  const [showCopied, setShowCopied] = useState(false);

  return (
    <Box
      sx={{
        minWidth: "41rem",
        maxWidth: "65rem",
        width: "100%",
        mb: opened ? "2rem" : "0",
      }}
    >
      <Card
        sx={{
          borderRadius: opened ? "1rem" : "1rem 1rem 0 0",
        }}
      >
        <Button
          variant="plain"
          onClick={toggle}
          sx={{
            height: "2rem",
          }}
          disabled={disable}
        >
          <Typography
            sx={{
              color: "inherit",
            }}
          >
            {opened ? t("ソースコードを非表示") : t("ソースコードを表示")}
          </Typography>
        </Button>

        {opened && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              maxHeight: "30rem",
              overflow: "auto",
            }}
            ref={scroll}
          >
            <IconButton
              onClick={() => handleCopy()}
              disabled={!source.code}
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
              <FileCopyIcon />
              <Snackbar
                open={showCopied}
                onClose={() => setShowCopied(false)}
                autoHideDuration={2000}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                sx={{
                  position: "absolute",
                  top: "2rem",
                  minWidth: "fit-content",
                  whiteSpace: "nowrap",
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
              // biome-ignore lint/security/noDangerouslySetInnerHtml: Shikiの正しい使い方
              dangerouslySetInnerHTML={{ __html: html }}
            ></div>
          </Box>
        )}
      </Card>
    </Box>
  );
};
