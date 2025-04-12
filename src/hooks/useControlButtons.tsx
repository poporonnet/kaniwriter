import { ControlButtons } from "components/ControlButtons";
import { MrubyWriterConnector, Target } from "libs/mrubyWriterConnector";
import { ComponentType } from "react";
import { CompileStatus } from "./useCompile";
import { Method } from "./useMrbwrite";
import { Option } from "./useOption";

type UseControlButtons = [buttons: ComponentType];

export const useControlButtons = (
  code: Uint8Array | undefined,
  target: Target | undefined,
  compileStatus: CompileStatus,
  option: Option,
  connector: MrubyWriterConnector,
  method: Method,
  startConnection: () => void
): UseControlButtons => {
  return [
    () => (
      <ControlButtons
        connect={{
          onClick: () => startConnection(),
          disabled: !target || connector.isConnected,
        }}
        write={{
          onClick: () =>
            code && method.writeCode(code, { autoVerify: option.autoVerify }),
          disabled:
            compileStatus.status !== "success" || !connector.isWriteMode,
        }}
        verify={{
          onClick: () => code && method.verify(code),
          disabled:
            compileStatus.status !== "success" || !connector.isWriteMode,
        }}
        execute={{
          onClick: () =>
            method.sendCommand("execute", { ignoreResponse: true }),
          disabled: !connector.isWriteMode,
        }}
        disconnect={{
          onClick: () => method.disconnect(),
          disabled: !connector.isConnected,
        }}
      />
    ),
  ];
};
