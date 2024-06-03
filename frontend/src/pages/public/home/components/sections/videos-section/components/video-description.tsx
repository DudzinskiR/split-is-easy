import { ReactNode } from "react";
import { twJoin } from "tailwind-merge";

interface VideoDescriptionProps {
  isActive: boolean;
  title: string;
  description: string;
  progress: number;
  onClick: () => void;
  color: string;
  icon: ReactNode;
}

export const VideoDescription = ({
  isActive,
  title,
  description,
  progress,
  onClick,
  color,
  icon,
}: VideoDescriptionProps) => {
  return (
    <div className="relative cursor-pointer" onClick={onClick}>
      <div
        className={"bg-[#0e1129] text-white w-full rounded-lg overflow-hidden"}
      >
        <div className="flex flex-row p-5">
          <div
            className="text-2xl relative top-1"
            style={{ color: isActive ? color : "#8f9eb2" }}
          >
            {icon}
          </div>

          <div className="ml-5 pr-3">
            <div
              className={twJoin(
                "text-2xl",
                isActive ? "text-white" : "text-slate-400"
              )}
            >
              {title}
            </div>
            <div
              className={twJoin(
                "text-lg text-slate-300 duration-300",
                isActive ? "max-h-[100px] opacity-100" : "max-h-0 opacity-0"
              )}
            >
              {description}
            </div>
          </div>
        </div>

        {isActive && (
          <div className="relative">
            <div className="w-full bg-[#1f2138] h-[3px] absolute bottom-[1px]"></div>
            <div
              className="w-full h-[3px] duration-1000 absolute bottom-[1px]"
              style={{
                width: `${progress * 100}%`,
                background: `linear-gradient(90deg, #070818 0%, ${color} 95%, rgba(255,255,255,1) 100%)`,
              }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};
