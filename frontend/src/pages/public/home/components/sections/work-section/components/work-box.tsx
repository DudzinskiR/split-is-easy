import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface WorkBoxProps {
  title: string;
  subtitle: string;
  icon: ReactNode;
  colors: string;
}

export const WorkBox = ({ title, subtitle, icon, colors }: WorkBoxProps) => {
  return (
    <div className="relative h-full group w-full">
      <div
        className={twMerge(
          "text-8xl absolute bottom-3 left-5 group-hover:rotate-[-25deg] duration-1000",
          colors
        )}
      >
        {icon}
      </div>

      <div
        className={twMerge(
          "w-full h-full rounded-2xl border-2 p-5 relative bg-clip-padding backdrop-filter backdrop-blur bg-[#04050e] bg-opacity-70 shadow-lg",
          colors
        )}
      >
        <div className="flex justify-center text-4xl">{icon}</div>
        <div className="text-center flex items-center justify-between flex-col">
          <div className="text-xl text-white">{title}</div>
          <div className="text-lg text-slate-300">{subtitle}</div>
        </div>
      </div>
    </div>
  );
};
