import { Box, Card } from "@mui/joy";
import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";
interface CodeProps {
  sourceCode: string;
}

// 送信したソースコードを表示するページ下部のコンポーネント
export const Code = ({ sourceCode }: CodeProps) => {
  const [html, setHtml] = useState<string>("");
  // 送信したmruby/cのソースコードを表示するかどうか
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    async function convertCodeToHtml() {
      const html = await codeToHtml(sourceCode, {
        lang: "ruby",
        theme: "github-light",
      });
      setHtml(html);
    }
    convertCodeToHtml();
  }, [sourceCode]);
  return (
    <Box
      sx={{
        minWidth: "30rem",
        maxWidth: "65rem",
        width: "100%",
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
          onClick={() => setIsOpen(!isOpen)}
        >
          <Typography fontFamily={"'M PLUS Rounded 1c', sans-serif"}>
            {isOpen ? "ソースコードを非表示" : "ソースコードを表示"}
          </Typography>
        </Button>

        {isOpen && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              maxWidth: "65rem",
              minWidth: "30rem",
              maxHeight: "30rem",
              overflow: "auto",
            }}
          >
            <div
              style={{
                width: "100%",
              }}
              dangerouslySetInnerHTML={{ __html: html }}
            ></div>
          </Box>
        )}
      </Card>
    </Box>
  );
};
