import { ComponentProps, PropsWithChildren } from "react";
import { useDialogContext } from "./context";

export default function DialogClose({
  children,
  ...rest
}: PropsWithChildren<ComponentProps<"button">>) {
  const context = useDialogContext();

  return (
    <button {...rest} onClick={() => context.onOpenChange(false)}>
      {children}
    </button>
  );
}
