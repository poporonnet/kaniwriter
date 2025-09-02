import { CheckCircleRounded as CheckCircleRoundedIcon } from "@mui/icons-material";
import {
  Box,
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
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { targets } from "./TargetSelector";

type TargetSelectModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  target: Target | undefined;
  onChangeTarget: (target: Target) => void;
};

export const TargetSelectModal: FC<TargetSelectModalProps> = ({
  open,
  setOpen,
  target,
  onChangeTarget,
}) => {
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
          p: 1.5,
          bgcolor: "background.body",
          width: "fit-content",
          maxWidth: "calc(100vw - 2rem)",
          maxHeight: "min(75vh, 40rem)",
          overflow: "auto",
          borderRadius: "0.5rem",
          boxShadow: "0px 3px 10px rgba(0,0,0,0.2)",
        }}
      >
        <ModalClose variant="plain" sx={{ m: 0.5 }} />
        <Typography sx={{ textAlign: "center" }}>
          {t("書き込みターゲットを選択してください。")}
        </Typography>
        <Box sx={{ display: "flex", gap: 1.5, p: 1 }}>
          <RadioGroup
            aria-label="platform"
            name="Website"
            orientation="horizontal"
            value={target}
            onChange={(event) => onChangeTarget(event.target.value as Target)}
            sx={{
              width: "auto",
              alignItems: "stretch",
              justifyContent: "space-around",
              [`& .${radioClasses.checked}`]: {
                [`& .${radioClasses.action}`]: {
                  inset: -1,
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
                  bgcolor: "background.surface",
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
        </Box>
      </Sheet>
    </Modal>
  );
};
