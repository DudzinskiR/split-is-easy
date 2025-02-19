import { ReactNode } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { twMerge } from "tailwind-merge";

interface ScrollToButtonProps {
  positionToScroll?: number;
  className?: string;
  icon?: ReactNode;
}

export const ScrollToButton = ({
  className,
  positionToScroll,
}: ScrollToButtonProps) => {
  const scrollToPosition = () => {
    window.scrollTo({ top: positionToScroll, behavior: "smooth" });
  };

  return (
    <button
      className={twMerge(
        "border-[4px] h-[80px] w-[30px] rounded-full relative border-zinc-300",
        className
      )}
      onClick={scrollToPosition}
    >
      <MdOutlineKeyboardArrowDown className="text-white/20 absolute absolute-center-x size-[30px] top-[5%]" />
      <MdOutlineKeyboardArrowDown className="text-white/20 absolute absolute-center-x size-[30px] top-[30%]" />
      <MdOutlineKeyboardArrowDown className="text-white/20 absolute absolute-center-x size-[30px] top-[55%]" />
      <div className="bg-zinc-300 size-[18px] rounded-full absolute-center-x absolute animate-scroll-dot"></div>
    </button>
  );
};
