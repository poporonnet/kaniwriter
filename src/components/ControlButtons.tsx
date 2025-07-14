import {
  Edit as EditIcon,
  FindInPage as FindInPageIcon,
  Flag as FlagIcon,
  Usb as UsbIcon,
  UsbOff as UsbOffIcon,
} from "@mui/icons-material";
import { Box } from "@mui/joy";
import { useTranslation } from "react-i18next";
import { ControlButton } from "./ControlButton";

const buttons = ["connect", "write", "verify", "execute"] as const;

type Props = Record<
  (typeof buttons)[number],
  {
    onClick: () => void;
    disabled: boolean;
    color?: "primary" | "success" | "warning" | "danger";
  } & { connect: { role: "connect" | "disconnect" } }
>;
export const ControlButtons = ({ connect, write, verify, execute }: Props) => {
  const [t] = useTranslation();
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "right",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <ControlButton
        label={connect.connect.role === "connect" ? t("接続") : t("切断")}
        icon={connect.color === "danger" ? <UsbOffIcon /> : <UsbIcon />}
        {...connect}
      />
      <ControlButton label={t("書き込み")} icon={<EditIcon />} {...write} />
      <ControlButton label={t("検証")} icon={<FindInPageIcon />} {...verify} />
      <ControlButton
        label={t("実行")}
        icon={<FlagIcon />}
        color="success"
        {...execute}
      />
    </Box>
  );
};
