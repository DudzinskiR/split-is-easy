import { InputHTMLAttributes, useId } from "react";
import { twMerge } from "tailwind-merge";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Checkbox = ({
  className,
  checked,
  onChange,
  ...otherProps
}: CheckboxProps) => {
  const id = useId();
  return (
    <input
      id={id}
      {...otherProps}
      checked={checked}
      onChange={(e) => {
        if (onChange) onChange(e);
      }}
      type="checkbox"
      className={twMerge("w-4 h-4 cursor-pointer", className)}
    ></input>
  );
};
