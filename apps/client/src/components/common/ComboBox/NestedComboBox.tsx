import { useRef } from "react";
import {
  NestedComboBoxProvider,
  NestedComboBoxProviderPropsType,
} from "./context";
import { useCalcChildComboBoxLayout, useNestedComboBoxContext } from "./hooks";

export interface ComboBoxItem {
  id: string;
  children?: ComboBoxItem[];
}

interface ComboBoxItemsProps {
  items: ComboBoxItem[];
}

interface NestedComboBoxProps extends NestedComboBoxProviderPropsType {
  items: ComboBoxItem[];
}

function OptionItem({ item }: { item: ComboBoxItem }) {
  const { renderOptionItem } = useNestedComboBoxContext();

  return (
    <li className="flex w-full items-center justify-between gap-10 bg-white px-3 py-2 transition-colors hover:bg-gray-200">
      {renderOptionItem({
        id: item.id,
      })}
    </li>
  );
}

function DropdownItem({ item }: { item: ComboBoxItem }) {
  const { renderDropdownItem } = useNestedComboBoxContext();
  const dropdownItemRef = useRef<HTMLLIElement>(null);
  const childComboBoxRef = useRef<HTMLUListElement>(null);

  useCalcChildComboBoxLayout({ dropdownItemRef, childComboBoxRef });

  return (
    <li
      ref={dropdownItemRef}
      className="group relative bg-white transition-colors hover:bg-gray-200 [&:hover>ul]:flex"
    >
      {renderDropdownItem({
        id: item.id,
      })}
      <ul
        ref={childComboBoxRef}
        className="absolute top-[-2px] hidden w-[250px] flex-col border-2 border-gray-100"
      >
        {item.children && <ComboBoxItems items={item.children} />}
      </ul>
    </li>
  );
}

function ComboBoxItems({ items }: ComboBoxItemsProps) {
  return (
    <>
      {items.map((item) =>
        item.children?.length ? (
          <DropdownItem key={item.id} item={item} />
        ) : (
          <OptionItem key={item.id} item={item} />
        ),
      )}
    </>
  );
}

export default function NestedComboBox({
  items,
  renderDropdownItem,
  renderOptionItem,
}: NestedComboBoxProps) {
  return (
    <NestedComboBoxProvider
      renderDropdownItem={renderDropdownItem}
      renderOptionItem={renderOptionItem}
    >
      <div className="relative flex w-[250px] flex-col border-2 border-gray-100">
        <ComboBoxItems items={items} />
      </div>
    </NestedComboBoxProvider>
  );
}
