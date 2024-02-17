import { twJoin } from "tailwind-merge";

interface CarouselLayerButtonProps {
  isShow: boolean;
  isLocalShow: boolean;
}

export const CarouselLayerButton = ({
  isShow,
  isLocalShow,
}: CarouselLayerButtonProps) => {
  return (
    <div className="absolute z-50 bottom-1/4 translate-y-[25%] overflow-hidden">
      <div
        className={twJoin(
          "duration-[1000ms]",
          !isShow && isLocalShow ? "translate-y-full opacity-50" : ""
        )}
      >
        <button
          className={twJoin(
            "md:p-3 p-1 md:text-xl text-sm font-semibold duration-150",
            "bg-transparent hover:bg-white hover:border-0 border-2 text-white hover:text-black"
          )}
        >
          LOGIN
        </button>
      </div>
    </div>
  );
};
