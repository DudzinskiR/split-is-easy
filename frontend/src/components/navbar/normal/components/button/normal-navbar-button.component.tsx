import { twMerge } from "tailwind-merge";
import { Link } from "react-router-dom";
export interface NormalNavbarButtonProps {
  text: string;
  to: string;
  isActive: boolean;
}

export const NormalNavbarButton = ({
  text,
  to,
  isActive,
}: NormalNavbarButtonProps) => {
  return (
    <li className="h-full list-none">
      <Link
        to={to}
        className={twMerge(
          "h-full flex items-center justify-center min-w-[5rem] hover:text-indigo-700 duration-150 cursor-pointer box-border",
          isActive && "border-b-2 border-indigo-500 font-semibold"
        )}
      >
        {text}
      </Link>
    </li>
  );
};
