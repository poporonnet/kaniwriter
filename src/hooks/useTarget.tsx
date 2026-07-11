import type { ComponentType } from "react";
import { TargetSelector } from "#/components/TargetSelector";
import type { Target } from "#/libs/mrbwrite/controller";
import { isTarget } from "#/libs/utility";
import { useStoreState } from "./useStoreState";

type UseTarget = [selector: ComponentType, { target: Target | undefined }];

export const useTarget = (onSelect: (target: Target) => void): UseTarget => {
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
