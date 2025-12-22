import { Stack } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { OptionCheckbox } from "./OptionCheckbox";

type Setter = (value: boolean) => void;

export const OptionList = ({
  autoScroll,
  setAutoScroll,
  autoConnect,
  setAutoConnect,
  autoVerify,
  setAutoVerify,
}: {
  autoScroll: boolean;
  setAutoScroll: Setter;
  autoConnect: boolean;
  setAutoConnect: Setter;
  autoVerify: boolean;
  setAutoVerify: Setter;
}) => {
  const [t] = useTranslation();

  return (
    <Stack w="100%" px="0.5rem">
      <OptionCheckbox
        label={t("自動スクロール")}
        value={autoScroll}
        setValue={setAutoScroll}
      />
      <OptionCheckbox
        label={t("自動接続(Experimental)")}
        value={autoConnect}
        setValue={setAutoConnect}
      />
      <OptionCheckbox
        label={t("自動検証(Experimental)")}
        value={autoVerify}
        setValue={setAutoVerify}
      />
    </Stack>
  );
};
