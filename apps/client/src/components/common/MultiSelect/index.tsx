import { useClickOutside } from "@/hooks/useClickOutside";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { ComponentRef, useRef, useState } from "react";

const options2 = [
  { id: "Apple", name: "apple" },
  { id: "Banana", name: "banana" },
  { id: "Cherry", name: "cherry" },
  { id: "Date", name: "date" },
  { id: "Grape", name: "grape" },
];

function MultiSelect({
  selected,
  setSelected,
  onValueChange,
  options = options2,
}: {
  options: { id: string; name: string }[];
  selected: { id: string; name: string }[];
  setSelected: React.Dispatch<
    React.SetStateAction<{ id: string; name: string }[]>
  >;
  onValueChange: (value: { id: string; name: string }[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const elementRef = useRef<ComponentRef<"div">>(null);
  const toggleSelection = (value: { id: string; name: string }) => {
    const newValue = selected.find((el) => el.id === value.id)
      ? selected.filter((item) => item.id !== value.id)
      : [...selected, value];

    onValueChange(newValue);
    setSelected(newValue);
  };

  useClickOutside({
    elementRef: elementRef,
    callback: () => {
      setOpen(false);
    },
  });

  return (
    <div ref={elementRef} className="relative w-full">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center border p-2 rounded-md bg-white shadow-sm"
      >
        {selected.length > 0
          ? selected.length > 3
            ? `${selected
                .slice(0, 3)
                .map((opt) => options.find((o) => o.id === opt.id)?.name)
                .join(", ")} +${selected.length - 3}`
            : options
                .filter((opt) => selected.find((el) => el.id === opt.id))
                .map((opt) => opt.name)
                .join(", ")
          : "Select options"}
        <ChevronDown className="ml-2 h-4 w-4" />
      </button>
      {open && (
        <div className="absolute mt-2 w-full bg-white border rounded-md shadow-md z-10">
          {options.map((option) => (
            <div
              key={option.id}
              onClick={() => toggleSelection(option)}
              className="p-2 cursor-pointer flex justify-between hover:bg-gray-100"
            >
              {option.name}
              {selected.find((el) => el.id === option.id) && (
                <Check className="h-4 w-4 text-blue-500" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function DualSelect({
  onMultiSelectValueChange,
  registerFunctionName,
  options,
}: {
  registerFunctionName: string;
  onMultiSelectValueChange: (value: { id: string; name: string }[]) => void;
  options: { id: string; name: string }[];
}) {
  const [multiSelected, setMultiSelected] = useState<
    { id: string; name: string }[]
  >([]);

  return (
    <div className="flex items-center space-x-4">
      <div className="w-1/3 flex justify-between items-center border p-2 rounded-md bg-white shadow-sm">
        {registerFunctionName
          ? registerFunctionName
          : "함수 이름을 설정 해주세요"}
      </div>
      <ArrowRight size={25} />

      <MultiSelect
        onValueChange={onMultiSelectValueChange}
        selected={multiSelected}
        setSelected={setMultiSelected}
        options={options}
      />
    </div>
  );
}
