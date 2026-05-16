import { keyframes } from "@emotion/react";
import { ActionIcon, Box, Text, useMantineTheme } from "@mantine/core";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { MdFileCopy as FileCopyIcon } from "react-icons/md";

const copiedLabelEnter = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

interface SourceCodeCopyButtonProps {
  text: string;
}

export const SourceCodeCopyButton = ({ text }: SourceCodeCopyButtonProps) => {
  const [showCopied, setShowCopied] = useState(false);
  const [copyFocused, setCopyFocused] = useState(false);
  const [copyHovered, setCopyHovered] = useState(false);
  const [t] = useTranslation();
  const theme = useMantineTheme();

  useEffect(() => {
    if (!showCopied || copyFocused || copyHovered) return;
    const id = window.setTimeout(() => setShowCopied(false), 100);
    return () => window.clearTimeout(id);
  }, [showCopied, copyFocused, copyHovered]);

  const handleCopy = () => {
    if (!text) return;
    void navigator.clipboard.writeText(text);
    setShowCopied(true);
  };

  return (
    <Box pos="absolute" right="1.8rem" top="-1rem" style={{ zIndex: 1 }}>
      <Box
        pos="relative"
        onMouseEnter={() => setCopyHovered(true)}
        onMouseLeave={() => setCopyHovered(false)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "fit-content",
        }}
      >
        <ActionIcon
          type="button"
          onClick={handleCopy}
          onFocus={() => setCopyFocused(true)}
          onBlur={() => setCopyFocused(false)}
          variant="subtle"
          color={theme.colors.primary[5]}
          aria-label={t("コピーする")}
          styles={{
            root: {
              "&:hover": {
                backgroundColor: theme.colors.neutral[0],
              },
            },
          }}
        >
          <FileCopyIcon />
        </ActionIcon>
        {showCopied && (
          <Box
            pos="absolute"
            top="100%"
            left="50%"
            mt={4}
            style={{
              transform: "translateX(-50%)",
              pointerEvents: "none",
            }}
          >
            <Box
              py={10}
              px={14}
              style={{
                borderRadius: "4px",
                border: `1px solid ${theme.colors.neutral[2]}`,
                backgroundColor: theme.colors.neutral[0],
                whiteSpace: "nowrap",
                animation: `${copiedLabelEnter} 1s cubic-bezier(.23,.92,.74,.41) forwards`,
              }}
            >
              <Text fz="0.9rem" c={theme.colors.neutral[7]} lh={1.3}>
                {t("コピーしました")}
              </Text>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};
