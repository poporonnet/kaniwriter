import { Modal, Stack, Text } from "@mantine/core";
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
      centered
      size="xl"
      w="min(90vw, 60rem)"
      radius="0.5rem"
      title={t("このブラウザはサポートされていません")}
    >
      <Stack gap="xs">
        <Text size="sm" style={{ whiteSpace: "pre-line" }}>
          {t("対応するブラウザを使ってください")}
        </Text>
      </Stack>
    </Modal>
  );
};
