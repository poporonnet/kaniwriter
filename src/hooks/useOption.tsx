import { OptionList } from "components/OptionList";
import { ComponentType, useMemo, useState } from "react";
import { useStoreState } from "./useStoreState";

export type Option = {
  autoScroll: boolean;
  autoConnect: boolean;
  autoVerify: boolean;
};

type UseOption = [list: ComponentType, Option];

export const useOption = (): UseOption => {
  const [autoScroll, setAutoScroll] = useState(true);
  const [autoConnect, setAutoConnect] = useStoreState("autoConnect", false);
  const [autoVerify, setAutoVerify] = useStoreState("autoVerify", false);
  const option = useMemo(
    () => ({ autoScroll, autoConnect, autoVerify }),
    [autoScroll, autoConnect, autoVerify]
  );

  return [
    () => (
      <OptionList
        autoScroll={autoScroll}
        setAutoScroll={setAutoScroll}
        autoConnect={autoConnect}
        setAutoConnect={(value) => {
          setAutoConnect(value);
          if (value) window.location.reload();
        }}
        autoVerify={autoVerify}
        setAutoVerify={setAutoVerify}
      />
    ),
    option,
  ];
};
