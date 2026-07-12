import {
  CloseButton,
  Modal,
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
      withCloseButton={false}
      centered
      size="fit-content"
      radius="0.5rem"
      padding={0}
      overlayProps={{
        backgroundOpacity: 0.25,
        color: "#32383e",
        blur: 8,
      }}
      styles={{
        content: {
          boxShadow: "none",
          minWidth: "500px",
          fontSize: "0.875rem",
          outline: `2px solid ${theme.colors.primary[5]}`,
          border: `1px solid ${theme.colors.neutral[3]}`,
        },
        body: {
          overflow: "visible",
        },
      }}
    >
      <Title
        order={4}
        fz="1.25rem"
        lh="1.875rem"
        m="0.5rem"
        style={{ fontWeight: 600, letterSpacing: "-0.025em" }}
      >
        {t("このブラウザはサポートされていません")}
      </Title>

      <CloseButton
        variant="transparent"
        onClick={() => setOpen(false)}
        pos="absolute"
        top="0.75rem"
        right="0.75rem"
        m="0.25rem"
        style={{
          outline: "none",
        }}
      />

      <Text fz="0.875rem" m="0.5rem" style={{ whiteSpace: "pre-line" }}>
        {t("対応するブラウザを使ってください")}
      </Text>
    </Modal>
  );
};
