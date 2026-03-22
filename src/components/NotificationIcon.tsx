import { MantineColor } from "@mantine/core";
import {
  MdCheckCircleOutline as CheckCircleOutlineIcon,
  MdErrorOutline as ErrorOutlineIcon,
  MdOutlineInfo as InfoOutlineIcon,
  MdOutlineWarningAmber as WarningAmberOutlineIcon,
} from "react-icons/md";

export const NotificationIcon = ({ type }: { type: MantineColor }) => {
  switch (type) {
    case "success":
      return <CheckCircleOutlineIcon />;
    case "danger":
      return <ErrorOutlineIcon />;
    case "warning":
      return <WarningAmberOutlineIcon />;
    case "primary":
      return <InfoOutlineIcon />;
    default:
      return <></>;
  }
};
