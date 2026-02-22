import { Modal, RadioGroup, Flex } from "@mantine/core";
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
      size="auto"
      overlayProps={{
        backgroundOpacity: 0.2,
        blur: 8,
      }}
      centered
    >
      <RadioGroup
        value={target}
        onChange={(event) => {
          onChangeTarget(event as Target);
        }}
        variant="horizontal"
      >
        <Flex gap="xl" p="xs" align="stretch" justify="center" wrap="wrap">
          {targets.map((value) => (
            <TargetCard
              key={value.title}
              title={value.title}
              image={value.image}
              target={target}
              setOpen={setOpen}
            />
          ))}
        </Flex>
      </RadioGroup>
    </Modal>
  );
};
