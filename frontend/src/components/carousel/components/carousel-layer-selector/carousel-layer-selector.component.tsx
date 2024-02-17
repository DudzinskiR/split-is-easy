import { twJoin } from "tailwind-merge";

interface CarouselLayerSelectorProps {
  numberOfLayers: number;
  onClick: (val: number) => void;
  selectedLayer: number;
}

export const CarouselLayerSelector = ({
  numberOfLayers,
  onClick,
  selectedLayer,
}: CarouselLayerSelectorProps) => {
  return (
    <div
      className="absolute md:bottom-5 bottom-2 h-[25px] left-1/2 translate-x-[-50%] z-50 select-none cursor-pointer"
      style={{ width: `${numberOfLayers * 30}px` }}
    >
      {Array.from({ length: numberOfLayers }).map((_, index) => (
        <div
          key={index}
          className={twJoin(
            "md:w-[20px] md:h-[20px] w-[10px] h-[10px] absolute rounded-full duration-150 flex justify-center items-center border-4 md:border-8",
            index === selectedLayer
              ? "bg-slate-800 border-slate-100"
              : "bg-slate-100 border-slate-800"
          )}
          style={{
            left: `${index * 35}px`,
          }}
          onClick={() => onClick(index)}
        ></div>
      ))}
    </div>
  );
};
