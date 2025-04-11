import {
  Box,
  FormLabel,
  Radio,
  radioClasses,
  RadioGroup,
  Sheet,
  Typography,
} from "@mui/joy";
import { CheckCircleRounded as CheckCircleRoundedIcon } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { Target } from "libs/mrubyWriterConnector";
import ESP32 from "/images/ESP32.png";
import RBoard from "/images/Rboard.png";

export const targets = [
  {
    title: "RBoard",
    image: RBoard,
  },
  {
    title: "ESP32",
    image: ESP32,
  },
] as const satisfies readonly { title: Target; image: string }[];

export const TargetSelector = ({
  target,
  onChangeTarget,
}: {
  target: Target | undefined;
  onChangeTarget: (target: Target) => void;
}) => {
  const [t] = useTranslation();

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      {!target && (
        <Typography textColor="red">
          {t("書き込みターゲットを選択してください。")}
        </Typography>
      )}
      <RadioGroup
        aria-label="platform"
        defaultValue="Website"
        overlay
        name="platform"
        sx={{
          width: "100%",
          gap: "1rem",
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
            key={index}
            variant="outlined"
            sx={{
              borderRadius: "md",
              boxShadow: "sm",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "1rem",
              p: "1rem",
            }}
          >
            <Radio
              id={value.title}
              value={value.title}
              checkedIcon={<CheckCircleRoundedIcon />}
              checked={target === value.title}
              onChange={() => onChangeTarget(value.title)}
            />
            <FormLabel htmlFor={value.title}>
              <Typography>{value.title}</Typography>
            </FormLabel>
            <img
              src={value.image}
              alt={value.title}
              style={{
                aspectRatio: "1/1",
                width: "6rem",
                margin: "0 auto",
              }}
            />
          </Sheet>
        ))}
      </RadioGroup>
    </Box>
  );
};
