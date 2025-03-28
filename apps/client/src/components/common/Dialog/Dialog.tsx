import useControllableState from "@/hooks/useControllableState/useControllableState";
import { PropsWithChildren, useId } from "react";
import { DialogContext } from "./context";
import DialogClose from "./DialogClose";
import DialogContent from "./DialogContent";
import DialogTrigger from "./DialogTrigger";

interface DialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}
function DialogRoot(props: PropsWithChildren<DialogProps>) {
  const { children, onOpenChange, open: openProp, defaultOpen } = props;
  const [open = false, setOpen] = useControllableState({
    prop: openProp,
    onChange: onOpenChange,
    defaultProp: defaultOpen,
  });
  const modalId = useId();

  return (
    <DialogContext.Provider
      value={{
        open,
        modalId,
        onOpenChange: setOpen,
        onOpenToggle: () => {
          setOpen((pre) => !pre);
        },
      }}
    >
      {children}
    </DialogContext.Provider>
  );
}

DialogRoot.displayName = "Dialog";

const Dialog = Object.assign(DialogRoot, {
  Content: DialogContent,
  Trigger: DialogTrigger,
  Close: DialogClose,
});

export default Dialog;
