import { createContext, JSX, PropsWithChildren, useMemo } from "react";

interface RenderItemArg {
  id: string;
}

export interface NestedComboBoxProviderPropsType {
  renderDropdownItem: (item: RenderItemArg) => JSX.Element;
  renderOptionItem: (item: RenderItemArg) => JSX.Element;
}

export const NestedComboBoxContext = createContext({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  renderDropdownItem: (_item: RenderItemArg) => <></>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  renderOptionItem: (_item: RenderItemArg) => <></>,
});

export function NestedComboBoxProvider({
  children,
  renderDropdownItem,
  renderOptionItem,
}: PropsWithChildren<NestedComboBoxProviderPropsType>) {
  const value = useMemo(
    () => ({
      renderDropdownItem,
      renderOptionItem,
    }),
    [renderDropdownItem, renderOptionItem],
  );
  return (
    <NestedComboBoxContext.Provider value={value}>
      {children}
    </NestedComboBoxContext.Provider>
  );
}
