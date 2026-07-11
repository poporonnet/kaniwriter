import { Button, type ButtonProps } from "@mui/joy";

type Props = {
  label: string;
  icon: React.ReactNode;
  onClick: NonNullable<ButtonProps["onClick"]>;
  disabled: NonNullable<ButtonProps["disabled"]>;
  color?: NonNullable<ButtonProps["color"]>;
  sx?: ButtonProps["sx"];
};

export const ControlButton = (props: Props) => (
  <Button
    onClick={props.onClick}
    disabled={props.disabled}
    color={props.color}
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.3rem",
      ...props.sx,
    }}
  >
    {props.label}
    {props.icon}
  </Button>
);
