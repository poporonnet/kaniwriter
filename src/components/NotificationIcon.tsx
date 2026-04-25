import { Box } from "@mantine/core";
import {
  MdOutlineCheckCircle as CheckCircleOutlineIcon,
  MdOutlineError as ErrorOutlineIcon,
  MdOutlineInfo as InfoOutlineIcon,
  MdOutlineCircleNotifications as NeutralOutlineIcon,
  MdOutlineWarningAmber as WarningAmberOutlineIcon,
} from "react-icons/md";
import type { NotificationColors } from "src/types/notification";

const iconMap: Record<NotificationColors, React.ElementType> = {
  success: CheckCircleOutlineIcon,
  danger: ErrorOutlineIcon,
  warning: WarningAmberOutlineIcon,
  primary: InfoOutlineIcon,
  neutral: NeutralOutlineIcon,
};

export const NotificationIcon = ({ type }: { type?: NotificationColors }) => {
  const Icon = type ? iconMap[type] : null;
  if (!Icon) return <></>;
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
