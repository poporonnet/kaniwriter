import {
  CheckCircleOutline,
  ErrorOutline,
  InfoOutlined,
  WarningAmberOutlined,
} from "@mui/icons-material";
import { ColorPaletteProp } from "@mui/joy";

export const NotificationIcon = ({ type }: { type: ColorPaletteProp }) => {
  switch (type) {
    case "success":
      return <CheckCircleOutline />;
    case "danger":
      return <ErrorOutline />;
    case "warning":
      return <WarningAmberOutlined />;
    case "primary":
      return <InfoOutlined />;
    default:
      return <></>;
  }
};
