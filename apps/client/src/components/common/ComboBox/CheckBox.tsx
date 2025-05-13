import { Check, ChevronRight } from "icons";

type CheckBoxType = {
  id: string;
  checked: boolean;
  name: string;
  onClick: (node: { id: string; checked: boolean }) => void;
};

function Dropdown(props: CheckBoxType) {
  return (
    <div className="flex w-full items-center justify-between gap-10 rounded-lg px-3 py-2">
      <CheckBox {...props} />
      <ChevronRight className="size-5" />
    </div>
  );
}

export const CheckBox = Object.assign(
  ({ onClick, id, name, checked }: CheckBoxType) => {
    return (
      <label
        htmlFor={id}
        className="flex w-fit cursor-pointer items-center gap-2"
      >
        <span className="relative size-5">
          <input
            id={id}
            type="checkbox"
            checked={checked}
            onChange={(e) => {
              onClick({ id, checked: e.currentTarget.checked });
            }}
            className="peer size-full cursor-pointer appearance-none rounded-sm  border-2 bg-[length:16px]  bg-center bg-no-repeat transition-colors checked:border-blue-300 checked:bg-blue-400"
          />
          <Check className="invisible absolute inset-1 size-3 text-white peer-checked:visible" />
        </span>
        <span className="text-sm">{name}</span>
      </label>
    );
  },
  {
    dropdown: Dropdown,
  },
);
