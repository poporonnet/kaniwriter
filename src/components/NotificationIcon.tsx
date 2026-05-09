import { Box } from "@mantine/core";
import {
  MdOutlineCheckCircle as CheckCircleOutlineIcon,
  MdOutlineError as ErrorOutlineIcon,
  MdOutlineInfo as InfoOutlineIcon,
  MdOutlineWarningAmber as WarningAmberOutlineIcon,
} from "react-icons/md";
import { type NotificationColor } from "types/notification";

const iconMap: Record<NotificationColor, React.ElementType> = {
  success: CheckCircleOutlineIcon,
  danger: ErrorOutlineIcon,
  warning: WarningAmberOutlineIcon,
  primary: InfoOutlineIcon,
};

export const NotificationIcon = ({ type }: { type: NotificationColor }) => {
  const Icon = iconMap[type as NotificationColor];
  if (!Icon) return <Box size={"1.25rem"} />;

  return (
    <Box display="flex">
      <Icon
        size="1.25rem"
        style={{
          background: "transparent",
          margin: 0,
        }}
      />
    </Box>
  );
};
