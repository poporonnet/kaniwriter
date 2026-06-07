import {
  CloseButton,
  Modal,
  Paper,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface UnsupportedBrowserModalProps {
  defaultOpen: boolean;
}

export const UnsupportedBrowserModal = ({
  defaultOpen,
}: UnsupportedBrowserModalProps) => {
  const [open, setOpen] = useState(defaultOpen);
  const [t] = useTranslation();
  const theme = useMantineTheme();

  return (
    <Modal
      opened={open}
      onClose={() => setOpen(false)}
      centered
      withCloseButton={false}
      padding={0}
      size="70rem"
      w="100%"
      maw="calc(100vw - 2rem)"
      styles={{
        content: {
          maxWidth: "calc(100vw - 2rem)",
          background: "transparent",
          boxShadow: "none",
        },
      }}
    >
      <Paper
        withBorder
        pos="relative"
        bg={theme.colors.neutral[0]}
        style={{
          borderRadius: "0.5rem",
          borderColor: theme.colors.neutral[3],
        }}
      >
        <CloseButton
          variant="subtle"
          color="gray"
          onClick={() => setOpen(false)}
          pos="absolute"
          top={4}
          right={4}
          m="xs"
        />
        <Title order={4} m="sm" lh={1.5}>
          {t("このブラウザはサポートされていません")}
        </Title>
        <Text fz="sm" m="0.5rem" style={{ whiteSpace: "pre-line" }} lh={1.5}>
          {t("対応するブラウザを使ってください")}
        </Text>
      </Paper>
    </Modal>
  );
};
