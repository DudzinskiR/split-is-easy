import { useEffect, useState } from "react";
import { useTimers } from "src/hooks";
import { twJoin } from "tailwind-merge";
import {
  CarouselLayerBackground,
  CarouselLayerLogo,
  CarouselLayerButton,
  CarouselLayerTitle,
} from "./components";

interface CarouselLayerProps {
  title: string;
  isShow: boolean;
  backgroundURL: string;
}

export const CarouselLayer = ({
  title,
  backgroundURL,
  isShow,
}: CarouselLayerProps) => {
  const [isLocalShow, setLocalShow] = useState(isShow);
  const { newTimer, clearAllTimers } = useTimers();
  useEffect(() => {
    if (isShow && !isLocalShow) {
      newTimer(() => setLocalShow(true), 50);
    }

    if (!isShow && isLocalShow) {
      newTimer(() => setLocalShow(false), 1000);
    }
  }, [clearAllTimers, isLocalShow, isShow, newTimer]);

  useEffect(() => clearAllTimers);

  return (
    <>
      <div
        className={twJoin(
          "absolute w-full h-full flex justify-center items-center duration-[1500ms]",
          !isShow && !isLocalShow ? "hidden" : "",
          !isShow && isLocalShow ? "scale-50 opacity-0 z-20" : "",
          isShow && !isLocalShow ? "scale-150 opacity-0 z-10" : ""
        )}
      >
        <CarouselLayerLogo isShow={isShow} isLocalShow={isLocalShow} />
        <CarouselLayerTitle
          title={title}
          isShow={isShow}
          isLocalShow={isLocalShow}
        />
        <CarouselLayerButton isShow={isShow} isLocalShow={isLocalShow} />
        <CarouselLayerBackground backgroundURL={backgroundURL} />
      </div>
    </>
  );
};
