import { Modal, ModalClose, RadioGroup, Sheet, Typography } from "@mui/joy";
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
      onClose={() => setOpen(false)}
      open={open}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 1,
      }}
    >
      <Sheet
        variant="outlined"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
          p: 2,
          width: "fit-content",
          maxHeight: "min(75vh, 40rem)",
          borderRadius: "0.5rem",
        }}
      >
        <ModalClose variant="plain" sx={{ m: 0.5 }} />
        <Typography sx={{ textAlign: "center" }}>
          {t("書き込みターゲットを選択してください")}
        </Typography>
        <RadioGroup
          orientation="horizontal"
          value={target}
          onChange={(event) => onChangeTarget(event.target.value as Target)}
          sx={{
            gap: 1.5,
            p: 1,
            width: "auto",
            alignItems: "stretch",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {targets.map((value) => (
            <TargetCard
              key={value.title}
              title={value.title}
              image={value.image}
              target={target}
              setOpen={setOpen}
            />
          ))}
        </RadioGroup>
      </Sheet>
    </Modal>
  );
};
