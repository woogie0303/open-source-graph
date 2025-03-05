import cn from "@/utils/cn";
import { PropsWithChildren } from "react";
import { useTabsContext } from "./context";
import { makeContentId, makeTriggerId } from "./utils";

interface TabTriggerProps {
  value: string;
  className?: string;
}

export default function TabsTrigger({
  value,
  children,
  className,
}: PropsWithChildren<TabTriggerProps>) {
  const context = useTabsContext();
  const triggerId = makeTriggerId(context.baseId, value);
  const contentId = makeContentId(context.baseId, value);
  const isSelected = context.value === value;
  console.log(isSelected);

  return (
    <button
      className={cn(
        "py-1.5 px-3 rounded-sm",
        className,
        isSelected && "bg-white text-black",
      )}
      type="button"
      role="tab"
      id={triggerId}
      aria-selected={isSelected}
      aria-controls={contentId}
      onClick={() => {
        context.onValueChange(value);
      }}
    >
      {children}
    </button>
  );
}
