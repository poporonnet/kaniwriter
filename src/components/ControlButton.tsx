import { Button } from "@mantine/core";

type Props = {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  disabled: boolean;
  color?: "neutral" | "primary" | "success" | "warning" | "danger";
};

export const ControlButton = ({
  label,
  icon,
  onClick,
  disabled,
  color = "primary",
}: Props) => (
  <Button
    onClick={onClick}
    disabled={disabled}
    px="1rem"
    radius="6px"
    color={`${color}.5`}
    bd={0}
    lh="1.5"
    rightSection={icon}
    styles={{
      section: {
        marginLeft: "0.3rem",
      },
    }}
  >
    {label}
  </Button>
);
