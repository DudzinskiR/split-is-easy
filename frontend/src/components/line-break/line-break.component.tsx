import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface LineBreakProps {
  text?: string;
  children?: ReactNode;
  className?: string;
  lineClassName?: string;
}

export const LineBreak = ({
  children,
  text,
  className,
  lineClassName,
}: LineBreakProps) => {
  return (
    <div
      className={twMerge(
        "flex flex-row justify-center items-center",
        className
      )}
    >
      <div
        className={twMerge("w-full border-b-4 border-slate-500", lineClassName)}
      ></div>
      {text && <div className="mx-4 text-2xl italic font-semibold">{text}</div>}
      {children}
      <div
        className={twMerge("w-full border-b-4 border-slate-500", lineClassName)}
      ></div>
    </div>
  );
};
