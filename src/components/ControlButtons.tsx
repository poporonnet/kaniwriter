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

const buttons = [
  "connect",
  "write",
  "verify",
  "execute",
  "disconnect",
] as const;

type Props = Record<
  (typeof buttons)[number],
  {
    onClick: () => void;
    disabled: boolean;
  }
>;

export const ControlButtons = ({
  connect,
  write,
  verify,
  execute,
  disconnect,
}: Props) => {
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
      <ControlButton label={t("接続")} icon={<UsbIcon />} {...connect} />
      <ControlButton label={t("書き込み")} icon={<EditIcon />} {...write} />
      <ControlButton label={t("検証")} icon={<FindInPageIcon />} {...verify} />
      <ControlButton
        label={t("実行")}
        icon={<FlagIcon />}
        color="success"
        {...execute}
      />
      <ControlButton
        label={t("切断")}
        icon={<UsbOffIcon />}
        color="danger"
        {...disconnect}
      />
    </Box>
  );
};
