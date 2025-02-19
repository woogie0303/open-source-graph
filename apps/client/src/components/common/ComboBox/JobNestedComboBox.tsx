import { CheckBox } from "./CheckBox";
import { NestedComboBoxProviderPropsType } from "./context";
import { useCheckBoxItemDataController } from "./hooks";
import NestedComboBox from "./NestedComboBox";

export default function JobNestedComboBox() {
  const { items, selectOne, findById } = useCheckBoxItemDataController();
  const renderDropdownItem: NestedComboBoxProviderPropsType["renderDropdownItem"] =
    ({ id }) => {
      const { name, isChecked } = findById(id);
      return (
        <CheckBox.dropdown
          name={name}
          onClick={({ id, checked }) => {
            selectOne({ id, checked });
          }}
          id={id}
          checked={isChecked}
        />
      );
    };
  const renderOptionItem: NestedComboBoxProviderPropsType["renderOptionItem"] =
    ({ id }) => {
      const { name, isChecked } = findById(id);

      return (
        <CheckBox
          onClick={({ id, checked }) => {
            selectOne({ id, checked });
          }}
          name={name}
          id={id}
          checked={isChecked}
        />
      );
    };

  return (
    <NestedComboBox
      items={items}
      renderDropdownItem={renderDropdownItem}
      renderOptionItem={renderOptionItem}
    />
  );
}
