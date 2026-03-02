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
        blur: 8,
      }}
      closeButtonProps={{
        icon: <CloseButton size="1.9rem" />,
        c: "neutral.5",
        m: 0.5,
      }}
      centered
      size="fit-content"
      radius="md"
      bg="neutral.5"
      styles={{
        title: {
          width: "100%",
          height: "1.5rem",
          textAlign: "center",
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
        <Group gap="sm" align="stretch" justify="center" wrap="wrap">
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
