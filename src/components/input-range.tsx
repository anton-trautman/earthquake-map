import { type ReactNode } from "react";
import type { FormInputName } from "../types";

function InputRange({
  label,
  value,
  onChange,
  id,
  min,
  max,
}: {
  label: string | ReactNode;
  value: string | number;
  onChange: (value: string, name: FormInputName) => void;
  id: FormInputName;
  min?: string;
  max?: string;
}) {
  return (
    <div className="flex flex-col gap-2 ">
      {label && (
        <label htmlFor={id} className="text-xs">
          {label}
        </label>
      )}

      <input
        type="range"
        id={id}
        min={min}
        max={max}
        className="custom-range "
        value={value}
        onChange={(e) => onChange(e.target.value, id)}
      />
    </div>
  );
}

export default InputRange;
