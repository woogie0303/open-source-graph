import { useEffect } from "react";

const useCalcChildComboBoxLayout = ({
  dropdownItemRef,
  childComboBoxRef,
}: {
  dropdownItemRef: React.RefObject<HTMLLIElement | null>;
  childComboBoxRef: React.RefObject<HTMLUListElement | null>;
}) => {
  useEffect(() => {
    const calcPosition = () => {
      if (!dropdownItemRef.current || !childComboBoxRef.current) {
        return;
      }
      const { offsetLeft = 0, offsetWidth = 0 } = dropdownItemRef.current;
      childComboBoxRef.current.style.left = `${offsetLeft + offsetWidth}px`;
    };

    if (dropdownItemRef.current) {
      const dropdownItem = dropdownItemRef.current;
      dropdownItemRef.current.addEventListener("mouseover", calcPosition);

      return () => {
        dropdownItem.removeEventListener("mouseover", calcPosition);
      };
    }
  });
};
export default useCalcChildComboBoxLayout;
