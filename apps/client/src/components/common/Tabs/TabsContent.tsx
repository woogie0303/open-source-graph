import { PropsWithChildren } from "react";
import { useTabsContext } from "./context";

interface TabsContentProps {
  value: string;
}

export default function TabsContent({
  value,
  children,
}: PropsWithChildren<TabsContentProps>) {
  const context = useTabsContext();
  const isSelected = context.value === value;

  return <div role="tabpanel">{isSelected && children}</div>;
}
