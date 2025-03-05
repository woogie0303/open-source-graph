import useControllableState from "@/hooks/useControllableState/useControllableState";
import { PropsWithChildren, useId } from "react";
import { TabsContext } from "./context";
import TabsContent from "./TabsContent";
import TabsTrigger from "./TabsTrigger";

interface TabsProps {
  value?: string;
  defaultValue: string;
  onChange?: () => void;
}

function TabsRoot({
  defaultValue,
  value: valueProp,
  children,
  onChange,
}: PropsWithChildren<TabsProps>) {
  const [value, setValue] = useControllableState({
    defaultProp: defaultValue,
    prop: valueProp,
    onChange,
  });

  return (
    <TabsContext.Provider
      value={{
        value,
        baseId: useId(),
        onValueChange: setValue,
      }}
    >
      {children}
    </TabsContext.Provider>
  );
}

const Tabs = Object.assign(TabsRoot, {
  Content: TabsContent,
  Trigger: TabsTrigger,
});

export default Tabs;
