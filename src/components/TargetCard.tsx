import { CheckCircleRounded as CheckCircleRoundedIcon } from "@mui/icons-material";
import { FormLabel, Radio, Sheet, Typography } from "@mui/joy";
import { Target } from "libs/mrubyWriterConnector";

type TargetCardProps = {
  title: Target;
  image: string;
  target?: string;
  setOpen: (open: boolean) => void;
};

export const TargetCard = (props: TargetCardProps) => {
  return (
    <Sheet
      variant="outlined"
      key={props.title}
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
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.18)",
        },
      }}
    >
      <Radio
        overlay
        id={props.title}
        value={props.title}
        checkedIcon={<CheckCircleRoundedIcon />}
        onClick={() => {
          props.setOpen(false);
        }}
      />
      <FormLabel htmlFor={props.title}>
        <Typography>{props.title}</Typography>
      </FormLabel>
      <img
        src={props.image}
        alt={props.title}
        style={{
          aspectRatio: "1/1",
          width: "5.5rem",
          margin: "0 auto",
        }}
      />
    </Sheet>
  );
};
