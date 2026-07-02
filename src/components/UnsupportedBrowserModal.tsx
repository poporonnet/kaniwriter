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
      size="50rem"
      radius="0.5rem"
      padding={0}
      styles={{
        content: {
          width: "80%",
          minWidth: "500px",
          border: "1px solid var(--mantine-color-neutral-3)",
        },
      }}
    >
      <Title order={4} mt="0.5rem" m="0.5rem" style={{fontWeight: "bold"}}>
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

      <Text fz="0.8rem" m="0.5rem" style={{ whiteSpace: "pre-line" }}>
        {t("対応するブラウザを使ってください")}
      </Text>
    </Modal>
  );
};
