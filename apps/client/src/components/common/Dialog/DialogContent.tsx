import cn from "@/utils/cn";
import { motion } from "motion/react";
import { PropsWithChildren } from "react";
import { Overlay } from "../Overlay";
import { Portal } from "../Portal";
import { useDialogContext } from "./context";

interface DialogContentProps {
  width?: number;
  height?: number;
}

export default function DialogContent({
  width,
  height,
  children,
}: PropsWithChildren<DialogContentProps>) {
  const context = useDialogContext();

  return (
    context.open && (
      <Portal>
        <Overlay
          onClick={() => {
            context.onOpenChange(false);
          }}
        />
        <motion.div
          id={context.modalId}
          initial={{
            translateY: "20%",
            translateX: "-50%",
          }}
          animate={{
            translateY: "-50%",
          }}
          aria-modal
          aria-expanded={context.open}
          className={cn(
            "fixed top-1/2 left-1/2 bg-white w-fit h-fit bottom-1/2 rounded-md p-3 block",
            width && `w-[${width}px]`,
            height && `h-[${height}px]`,
          )}
        >
          {children}
        </motion.div>
      </Portal>
    )
  );
}

DialogContent.displayName = "Dialog.Content";
