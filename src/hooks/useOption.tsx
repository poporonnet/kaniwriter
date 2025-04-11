import { OptionList } from "components/OptionList";
import { ComponentType, useState } from "react";
import { useStoreState } from "./useStoreState";

type UseOptionList = [
  list: ComponentType,
  { autoScroll: boolean; autoConnect: boolean; autoVerify: boolean },
];

export const useOption = (): UseOptionList => {
  const [autoScroll, setAutoScroll] = useState(true);
  const [autoConnect, setAutoConnect] = useStoreState("autoConnect", false);
  const [autoVerify, setAutoVerify] = useStoreState("autoVerify", false);

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
    { autoScroll, autoConnect, autoVerify },
  ];
};
