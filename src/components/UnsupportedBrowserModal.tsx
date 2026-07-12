import { CloseButton, Modal, Text, Title } from "@mantine/core";
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
        color: "#0B0D0E",
        blur: 8,
      }}
      styles={{
        content: {
          border: "1px solid var(--mantine-color-neutral-3)",
          fontSize: "0.875"
        },
      }}
    >
      <Title
        order={4}
        fz="1.25rem"
        mt="0.5rem"
        m="0.5rem"
        style={{ fontWeight: "bold", letterSpacing: "-0.055em" }}
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
      />

      <Text fz="0.85rem" m="0.5rem" style={{ whiteSpace: "pre-line" }}>
        {t("対応するブラウザを使ってください")}
      </Text>
    </Modal>
  );
};
