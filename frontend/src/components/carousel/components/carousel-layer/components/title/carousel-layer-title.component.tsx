import { twJoin } from "tailwind-merge";

interface CarouselLayerTitleProps {
  title: string;
  isShow: boolean;
  isLocalShow: boolean;
}

export const CarouselLayerTitle = ({
  title,
  isShow,
  isLocalShow,
}: CarouselLayerTitleProps) => {
  return (
    <div className="relative overflow-hidden">
      <div
        className={twJoin(
          "relative md:text-5xl text-3xl font-bold z-50 text-white duration-[1000ms]",
          !isShow && isLocalShow ? "translate-y-full opacity-50" : ""
        )}
      >
        {title}
      </div>
    </div>
  );
};
