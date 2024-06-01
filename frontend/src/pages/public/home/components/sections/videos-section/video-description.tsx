import { twJoin } from "tailwind-merge";

interface VideoDescriptionProps {
  isActive: boolean;
  title: string;
  description: string;
  progress: number;
  onClick: () => void;
}

export const VideoDescription = ({
  isActive,
  title,
  description,
  progress,
  onClick,
}: VideoDescriptionProps) => {
  return (
    <div className="relative cursor-pointer" onClick={onClick}>
      <div className="bg-[#0e1129] text-white p-5 w-full">
        <div className="text-2xl">{title}</div>
        <div
          className={twJoin(
            "text-lg text-slate-400 duration-300",
            isActive ? "max-h-[100px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          {description}
        </div>
      </div>
      {isActive && (
        <>
          <div className="absolute bottom-0 w-full bg-[#1f2138] h-[3px]"></div>
          <div
            className="bg-red-500 w-full h-[3px] duration-500 absolute bottom-0"
            style={{
              width: `${progress * 100}%`,
              background: `linear-gradient(90deg, #070818 0%, rgba(8,162,255,1) 95%, rgba(255,255,255,1) 100%)`,
            }}
          ></div>
        </>
      )}
    </div>
  );
};
