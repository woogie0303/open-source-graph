import { PropsWithChildren } from "react";
import { useDialogContext } from "./context";

export default function DialogTrigger({ children }: PropsWithChildren) {
  const context = useDialogContext();
  // TODO: Slot 추가하기 div -> button (radix-ui)

  return (
    <div
      aria-controls={context.modalId}
      className="flex items-center justify-center"
      onClick={context.onOpenToggle}
    >
      {children}
    </div>
  );
}

DialogTrigger.displayName = "Dialog.Trigger";
