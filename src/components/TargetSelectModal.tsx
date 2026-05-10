import { CloseButton, Group, Modal, Radio } from "@mantine/core";
import { Target } from "libs/mrbwrite/controller";
import { useTranslation } from "react-i18next";
import { TargetCard } from "./TargetCard";
import { targets } from "./TargetSelector";

type TargetSelectModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  target: Target | undefined;
  onChangeTarget: (target: Target) => void;
};

export const TargetSelectModal = ({
  open,
  setOpen,
  target,
  onChangeTarget,
}: TargetSelectModalProps) => {
  const [t] = useTranslation();
  return (
    <Modal
      opened={open}
      onClose={() => setOpen(false)}
      title={t("書き込みターゲットを選択してください")}
      overlayProps={{
        backgroundOpacity: 0.25,
        color: "natural.7",
        blur: 8,
      }}
      closeButtonProps={{
        icon: <CloseButton size="1.9rem" m={0.5} />,
        c: "neutral.5",
        m: 4,
      }}
      centered
      size="fit-content"
      radius="md"
      bg="neutral.1"
      styles={{
        title: {
      padding="md"
      styles={{
        inner: {
          padding: "8px",
        },
        header: {
          background: "none",
          padding: "1rem",
          paddingBottom: "0.75rem",
          minHeight: "unset",
        },
        title: {
          width: "100%",
          height: "1.5rem",
          textAlign: "center",
          lineHeight: "1.5rem",
        },
        content: {
          background: theme.colors.neutral[0],
          border: "solid 0.8px",
          borderColor: theme.colors.neutral[3],
        },
      }}
    >
      <Radio.Group
        value={target}
        onChange={(event) => {
          onChangeTarget(event as Target);
        }}
        mah="min(75vh, 40rem)"
        variant="horizontal"
        p="8px"
      >
        <Group gap="sm" align="stretch" justify="center">
          {targets.map((value) => (
            <TargetCard
              key={value.title}
              title={value.title}
              image={value.image}
              target={target}
              setOpen={setOpen}
            />
          ))}
        </Group>
      </Radio.Group>
    </Modal>
  );
};
