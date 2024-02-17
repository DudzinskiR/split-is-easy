import { useCallback, useEffect, useRef, useState } from "react";
import { useTimers } from "src/hooks";
import { CarouselLayerData } from "src/types";
import { calcTimeToNextChange, selectIndex } from "./helpers";
import {
  CarouselButton,
  CarouselLayer,
  CarouselLayerSelector,
} from "./components";

interface CarouselProps {
  layersData: CarouselLayerData[];
  interval?: number;
  cooldown?: number;
  timeout?: number;
}

export const Carousel = ({
  layersData,
  interval = 10000,
  cooldown = 1500,
  timeout = 150,
}: CarouselProps) => {
  const [indexToShow, setIndexToShow] = useState(0);
  const [selectedLayer, setSelectedLayer] = useState(0);
  const { newTimer, clearAllTimers } = useTimers();

  const lastLayerChange = useRef<number>(new Date().getTime());
  const changeInterval = useRef<ReturnType<typeof setInterval>>();

  const changeIndex = useCallback(
    (change: number) => () => {
      setSelectedLayer((prev) => selectIndex(prev, change, layersData.length));
    },
    [layersData.length]
  );

  const startChangeInterval = useCallback(
    (time: number) => {
      if (changeInterval.current) clearInterval(changeInterval.current);
      changeInterval.current = setInterval(changeIndex(1), time);
    },
    [changeIndex]
  );

  useEffect(() => {
    startChangeInterval(interval);

    return () => clearInterval(changeInterval.current);
  }, [interval, startChangeInterval]);

  useEffect(() => {
    newTimer(() => {
      setIndexToShow(selectedLayer);
      lastLayerChange.current = new Date().getTime();
      startChangeInterval(interval);
    }, calcTimeToNextChange(lastLayerChange.current, cooldown, timeout));

    return clearAllTimers;
  }, [
    clearAllTimers,
    cooldown,
    interval,
    newTimer,
    selectedLayer,
    startChangeInterval,
    timeout,
  ]);

  return (
    <div className="relative w-screen bg-white h-[200px] sm:h-[300px] md:h-[400px] overflow-hidden group duration-150">
      <CarouselButton site={"LEFT"} onClick={changeIndex(-1)} />

      <CarouselButton site={"RIGHT"} onClick={changeIndex(1)} />

      {layersData.map((item, index) => (
        <CarouselLayer
          key={index}
          title={item.title}
          backgroundURL={item.backgroundURL}
          isShow={indexToShow === index}
        />
      ))}

      <CarouselLayerSelector
        numberOfLayers={layersData.length}
        onClick={(val) => setSelectedLayer(val)}
        selectedLayer={selectedLayer}
      />
    </div>
  );
};
