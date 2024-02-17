interface CarouselLayerBackgroundProps {
  backgroundURL: string;
}

export const CarouselLayerBackground = ({
  backgroundURL,
}: CarouselLayerBackgroundProps) => {
  return (
    <>
      <img
        src={backgroundURL}
        alt=""
        className="h-full w-full object-cover absolute"
      />
      <div className="absolute w-full h-full bg-black/20 z-30 select-none"></div>
    </>
  );
};
