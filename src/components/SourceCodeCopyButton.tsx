import { ActionIcon, Box, Text, Tooltip } from "@mantine/core";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { MdFileCopy as FileCopyIcon } from "react-icons/md";

interface SourceCodeCopyButtonProps {
  text: string;
}

export const SourceCodeCopyButton = ({ text }: SourceCodeCopyButtonProps) => {
  const [showCopied, setShowCopied] = useState(false);
  const [t] = useTranslation();

  useEffect(() => {
    if (!showCopied) return;
    const id = window.setTimeout(() => setShowCopied(false), 2000);
    return () => window.clearTimeout(id);
  }, [showCopied]);

  const handleCopy = async () => {
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      setShowCopied(true);
    } catch {
      setShowCopied(false);
    }
  };

  return (
    <Box pos="absolute" right="2.5rem" top={0} style={{ zIndex: 1 }}>
      <Tooltip
        label={
          <Text fz="0.9rem" c="neutral.7" lh={1.3}>
            {t("コピーしました")}
          </Text>
        }
        opened={showCopied}
        position="bottom"
        offset={4}
        radius={4}
        color="neutral.0"
        withinPortal={false}
        transitionProps={{ duration: 0 }}
        events={{ hover: false, focus: false, touch: false }}
        styles={{
          tooltip: {
            border: "1px solid var(--mantine-color-neutral-2)",
            padding: "10px 14px",
            whiteSpace: "nowrap",
          },
        }}
      >
        <ActionIcon
          type="button"
          onClick={handleCopy}
          variant="subtle"
          color="primary.5"
          aria-label={t("コピーする")}
        >
          <FileCopyIcon />
        </ActionIcon>
      </Tooltip>
    </Box>
  );
};
