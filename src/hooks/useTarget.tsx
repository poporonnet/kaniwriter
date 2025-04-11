import { Target } from "libs/mrubyWriterConnector";
import { useStoreState } from "./useStoreState";
import { isTarget } from "libs/utility";
import { TargetSelector } from "components/TargetSelector";
import { ComponentType } from "react";

type UseTargetSelector = [
  selector: ComponentType,
  { target: Target | undefined }
];

export const useTarget = (
  onSelect: (target: Target) => void
): UseTargetSelector => {
  const [target, setTarget] = useStoreState<Target | undefined>(
    "target",
    undefined,
    isTarget
  );

  return [
    () => (
      <TargetSelector
        target={target}
        onChangeTarget={(target) => {
          setTarget(target);
          onSelect(target);
        }}
      />
    ),
    { target },
  ];
};
