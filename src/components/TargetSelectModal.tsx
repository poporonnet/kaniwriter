import { CheckCircleRounded as CheckCircleRoundedIcon } from "@mui/icons-material";
import {
  FormLabel,
  Modal,
  ModalClose,
  Radio,
  RadioGroup,
  radioClasses,
  Sheet,
  Typography,
} from "@mui/joy";
import { Target } from "libs/mrubyWriterConnector";
import { useTranslation } from "react-i18next";
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
          value={target}
          onChange={(event) => onChangeTarget(event.target.value as Target)}
          sx={{
            gap: 1.5,
            p: 1,
            width: "auto",
            alignItems: "stretch",
            justifyContent: "center",
            flexWrap: "wrap",
            [`& .${radioClasses.checked}`]: {
              [`& .${radioClasses.action}`]: {
                border: "3px solid",
                borderColor: "primary.500",
              },
            },
            [`& .${radioClasses.radio}`]: {
              display: "contents",
              "& > svg": {
                zIndex: 2,
                position: "absolute",
                top: "-0.5rem",
                right: "-0.5rem",
                borderRadius: "50%",
              },
            },
          }}
        >
          {targets.map((value, index) => (
            <Sheet
              variant="outlined"
              key={index}
              sx={{
                position: "relative",
                borderRadius: "md",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                gap: "0.75rem",
                p: "0.75rem 2rem",
                m: 1,
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.12)",
                transition: "box-shadow 0.2s",
                "&:hover": {
                  boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
                },
              }}
            >
              <Radio
                overlay
                id={value.title}
                value={value.title}
                checkedIcon={<CheckCircleRoundedIcon />}
                onClick={() => {
                  if (value.title === target) {
                    setOpen(false);
                  }
                }}
              />
              <FormLabel htmlFor={value.title}>
                <Typography>{value.title}</Typography>
              </FormLabel>
              <img
                src={value.image}
                alt={value.title}
                style={{
                  aspectRatio: "1/1",
                  width: "5.5rem",
                  margin: "0 auto",
                }}
              />
            </Sheet>
          ))}
        </RadioGroup>
      </Sheet>
    </Modal>
  );
};
