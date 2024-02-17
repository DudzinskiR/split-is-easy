import { twJoin } from "tailwind-merge";

interface CarouselButtonProps {
  site: "LEFT" | "RIGHT";
  onClick: () => void;
}

export const CarouselButton = ({ site, onClick }: CarouselButtonProps) => {
  return (
    <>
      <div
        onClick={onClick}
        className={twJoin(
          "absolute h-full w-1/3 z-50",
          site === "LEFT" ? "left-0" : "right-0"
        )}
      ></div>
      <button
        onClick={onClick}
        className={twJoin(
          "absolute z-50 top-1/2 translate-y-[-50%] opacity-0 w-10 h-10 rounded duration-300",
          "group-hover:bg-black/50 group-hover:opacity-100 ",
          site === "LEFT" ? "md:left-10 left-5" : "md:right-10 right-5"
        )}
      >
        <div className="text-2xl text-slate-100 h-full">
          {site === "LEFT" ? "<" : ">"}
        </div>
      </button>
    </>
  );
};
