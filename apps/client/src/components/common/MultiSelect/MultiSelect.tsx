import { useClickOutside } from "@/hooks/useClickOutside";
import { Check, ChevronDown } from "icons";
import { ComponentRef, useEffect, useRef, useState } from "react";

// TODO: Radix UI Select 오픈소스 보고 구현해보기
export default function MultiSelect({
  selectedValue,
  onValueChange,
  options,
}: {
  options?: { id: string; name: string }[];
  selectedValue?: { id: string; name: string }[];
  onValueChange: (value: { id: string; name: string }[]) => void;
}) {
  const [selected, setSelected] = useState<{ id: string; name: string }[]>([]);
  const [open, setOpen] = useState(false);
  const elementRef = useRef<ComponentRef<"div">>(null);

  useEffect(() => {
    if (selectedValue) {
      setSelected(selectedValue);
    }
  }, [selectedValue]);

  const toggleSelection = (value: { id: string; name: string }) => {
    const newValue = selected.find((el) => el.id === value.id)
      ? selected.filter((item) => item.id !== value.id)
      : [...selected, value];

    onValueChange(newValue);
    setSelected(newValue);
  };

  useClickOutside({
    elementRef,
    callback: () => setOpen(false),
  });

  return (
    <div ref={elementRef} className="relative w-full">
      <button
        onClick={(e) => {
          e.preventDefault();
          setOpen(!open);
        }}
        className="w-full flex justify-between items-center border p-2 rounded-md bg-white shadow-sm"
      >
        {options && selected.length > 0
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

      {open && options && (
        <div className="absolute mt-2 w-full bg-white border rounded-md shadow-md z-10 max-h-[250px] overflow-auto">
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
