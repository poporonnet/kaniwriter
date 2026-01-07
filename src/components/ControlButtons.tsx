import { Group } from "@mantine/core";
import { useTranslation } from "react-i18next";
import {
  MdEdit as EditIcon,
  MdFindInPage as FindInPageIcon,
  MdFlag as FlagIcon,
  MdUsb as UsbIcon,
  MdUsbOff as UsbOffIcon,
} from "react-icons/md";
import { ControlButton } from "./ControlButton";

const buttons = ["connect", "write", "verify", "execute"] as const;

type Props = Record<
  (typeof buttons)[number],
  {
    onClick: () => void;
    disabled: boolean;
  }
> & { connect: { role: "connect" | "disconnect" } };

export const ControlButtons = ({ connect, write, verify, execute }: Props) => {
  const [t] = useTranslation();
  return (
    <Group justify="right">
      <ControlButton
        label={connect.role === "connect" ? t("接続") : t("切断")}
        icon={connect.role === "connect" ? <UsbIcon /> : <UsbOffIcon />}
        color={connect.role === "connect" ? "primary" : "danger"}
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
    </Group>
  );
};
