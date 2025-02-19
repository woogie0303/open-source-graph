import { useContext } from "react";
import { NestedComboBoxContext } from "../context/NestedComboBoxProvider";

const useNestedComboBoxContext = () => useContext(NestedComboBoxContext);

export default useNestedComboBoxContext;
