import { HTMLAttributes } from "react";
import { Checkbox } from "src/components/inputs/Checkbox/Checkbox";
import { twMerge } from "tailwind-merge";

import { useDropdownContext } from "../../hook/useDropdownContext";

export interface DropdownButtonProps extends HTMLAttributes<HTMLElement> {
  text: string;
  isChecked: boolean;
}

export const DropdownButton = ({
  isChecked,
  text,
  onClick,
  className,
  style,
  ...htmlProps
}: DropdownButtonProps) => {
  const { rowHeight } = useDropdownContext();
  return (
    <li
      className={twMerge(
        "text-lg flex items-center select-none duration-150 cursor-pointer",
        isChecked
          ? "bg-slate-100 hover:bg-slate-200"
          : "bg-white hover:bg-slate-150 ",
        className
      )}
      style={{ ...style, height: `${rowHeight}px` }}
      role="option"
      onClick={onClick}
      {...htmlProps}
    >
      <Checkbox className="mx-2" checked={isChecked} readOnly tabIndex={-1} />
      <div className=" w-11/12 truncate">{text}</div>
    </li>
  );
};
