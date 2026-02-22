import { Box, Radio, Text } from "@mantine/core";
import { Target } from "libs/mrbwrite/controller";
import { MdCheckCircle as CheckCircleIcon } from "react-icons/md";

type TargetCardProps = {
  title: Target;
  image: string;
  target?: string;
  setOpen: (open: boolean) => void;
};

export const TargetCard = (props: TargetCardProps) => {
  const isChecked = props.target === props.title;

  return (
    <Box
      component="label"
      onClick={() => {
        props.setOpen(false);
      }}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: "0.75rem",
        padding: "0.75rem 2rem",
        margin: "0.5rem",
        borderRadius: "var(--mantine-radius-md)",
        border: isChecked
          ? "3px solid var(--mantine-color-blue-filled)"
          : "1px solid var(--mantine-color-default-border)",
        boxShadow: isChecked
          ? "0 4px 16px rgba(0, 0, 0, 0.18)"
          : "0 2px 8px rgba(0, 0, 0, 0.12)",
        cursor: "pointer",
        transition: "box-shadow 0.2s, border 0.2s",
        backgroundColor: "var(--mantine-color-body)",
      }}
      onMouseEnter={(e) => {
        if (!isChecked)
          e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.18)";
      }}
      onMouseLeave={(e) => {
        if (!isChecked)
          e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.12)";
      }}
    >
      <Radio value={props.title} display="none" />
      {isChecked && (
        <Box
          style={{
            position: "absolute",
            top: "-0.4rem",
            right: "-0.4rem",
            backgroundColor: "white",
            borderRadius: "50%",
            zIndex: 2,
            display: "flex",
            color: "var(--mantine-color-blue-filled)",
          }}
        >
          <CheckCircleIcon size={24} />
        </Box>
      )}

      <Text>{props.title}</Text>
      <img
        src={props.image}
        alt={props.title}
        style={{
          aspectRatio: "1/1",
          width: "5.5rem",
        }}
      />
    </Box>
  );
};
