import { ControlButtons } from "components/ControlButtons";
import { MrbwriteMiddleware } from "libs/mrbwrite/middleware";
import { MrbwriteController, Target } from "libs/mrbwrite/controller";
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
  mrbwriteController: MrbwriteController<MrbwriteMiddleware<unknown>>,
  method: Method<MrbwriteMiddleware<unknown>>,
  startConnection: () => void
): UseControlButtons => {
  return [
    () => (
      <ControlButtons
        connect={{
          onClick: () => {
            target && !mrbwriteController.isConnected
              ? startConnection()
              : method.disconnect();
          },
          disabled: !target,
          role:
            target && mrbwriteController.isConnected ? "disconnect" : "connect",
        }}
        write={{
          onClick: () =>
            code && method.writeCode(code, { autoVerify: option.autoVerify }),
          disabled:
            compileStatus.status !== "success" ||
            !mrbwriteController.isWriteMode,
        }}
        verify={{
          onClick: () => code && method.verify(code),
          disabled:
            compileStatus.status !== "success" ||
            !mrbwriteController.isWriteMode,
        }}
        execute={{
          onClick: () =>
            method.sendCommand("execute", { ignoreResponse: true }),
          disabled: !mrbwriteController.isWriteMode,
        }}
      />
    ),
  ];
};
