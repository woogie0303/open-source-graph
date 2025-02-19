import { createContext, useContext } from "react";

interface DialogContextType {
  modalId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOpenToggle: () => void;
}

export const DialogContext = createContext<DialogContextType>({
  modalId: "",
  open: false,
  onOpenChange: () => {},
  onOpenToggle: () => {},
});

export const useDialogContext = () => {
  const context = useContext(DialogContext);

  if (context === null) {
    throw new Error("DialogContext is not found");
  }

  return context;
};
