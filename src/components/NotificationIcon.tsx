import { Box } from "@mantine/core";
import {
  MdOutlineCheckCircle as CheckCircleOutlineIcon,
  MdOutlineError as ErrorOutlineIcon,
  MdOutlineInfo as InfoOutlineIcon,
  MdOutlineWarningAmber as WarningAmberOutlineIcon,
} from "react-icons/md";
import {
  NOTIFICATION_COLORS,
  type NotificationColors,
} from "types/notification";

const iconMap: Record<NotificationColors, React.ElementType> = {
  success: CheckCircleOutlineIcon,
  danger: ErrorOutlineIcon,
  warning: WarningAmberOutlineIcon,
  primary: InfoOutlineIcon,
};

export const NotificationIcon = ({ type }: { type: NotificationColors }) => {
  const isNotificationColor = (type: string): type is NotificationColors =>
    (NOTIFICATION_COLORS as readonly string[]).includes(type);

  if (!isNotificationColor(type)) return <Box size={"1.25rem"} />;

  const Icon = iconMap[type as NotificationColors];
  if (!Icon) return <Box size={"1.25rem"} />;

  return (
    <Box display="flex">
      <Icon
        size={"1.25rem"}
        style={{
          background: "transparent",
          margin: 0,
        }}
      />
    </Box>
  );
};
