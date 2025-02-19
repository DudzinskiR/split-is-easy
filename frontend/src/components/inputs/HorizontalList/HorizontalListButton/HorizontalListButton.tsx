import { HTMLAttributes } from "react";
import { ButtonColor } from "src/enums/ButtonColor/ButtonColor";
import { twMerge } from "tailwind-merge";

interface HorizontalListButtonProps extends HTMLAttributes<HTMLButtonElement> {
  label: string;
  isActive: boolean;
}

const HorizontalListButton = ({
  label,
  isActive,
  className,
  ...buttonProps
}: HorizontalListButtonProps) => {
  return (
    <button
      className={twMerge(
        "first:rounded-s-lg last:rounded-e-lg border-y-2 border-l-2 last:border-r-2",
        "flex items-center h-10 px-3 border-indigo-500 text-indigo-900 font-medium cursor-pointer",
        "bg-white hover:bg-slate-150 duration-150 hover:font-semibold",
        isActive ? `${ButtonColor.PURPLE} text-white font-semibold` : "",
        className
      )}
      {...buttonProps}
    >
      {label}
    </button>
  );
};

export default HorizontalListButton;
