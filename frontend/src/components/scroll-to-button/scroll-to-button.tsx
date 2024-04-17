import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ScrollToButtonProps {
  positionToScroll?: number;
  className?: string;
  icon?: ReactNode;
}

export const ScrollToButton = ({
  className,
  positionToScroll,
  icon,
}: ScrollToButtonProps) => {
  const scrollToPosition = () => {
    window.scrollTo({ top: positionToScroll, behavior: "smooth" });
  };

  return (
    <button
      className={twMerge(
        "absolute size-[60px]  rounded-full flex justify-center items-center shadow-lg cursor-pointer  duration-300",
        "bg-gradient-to-r from-sky-600 to-blue-700 hover:saturate-[1.5]",
        "text-3xl text-white",
        className
      )}
      onClick={scrollToPosition}
    >
      {icon}
    </button>
  );
};
