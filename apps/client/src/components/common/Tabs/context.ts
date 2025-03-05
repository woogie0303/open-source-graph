import { createContext, useContext } from "react";

interface TabsContextType {
  value?: string;
  onValueChange: (value: string) => void;
  baseId: string;
}
export const TabsContext = createContext<TabsContextType>({
  value: "",
  onValueChange: () => {},
  baseId: "",
});

export const useTabsContext = () => {
  const context = useContext(TabsContext);

  if (context === null) {
    throw new Error("TabsContext is not defined");
  }

  return context;
};
