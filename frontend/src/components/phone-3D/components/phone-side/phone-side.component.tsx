interface PhoneSideProps {
  transform: string;
  height: number;
  width: number;
  left?: number;
  top?: number;
}

export const PhoneSide = ({
  transform,
  height,
  width,
  left,
  top,
}: PhoneSideProps) => {
  return (
    <div
      style={{
        position: "absolute",
        transformStyle: "preserve-3d",
        transform: transform,
        left: left,
        top: top,
        transformOrigin: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          height: height,
          background:
            "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(69,69,69,1) 10%, rgba(69,69,69,1) 90%, rgba(0,0,0,1) 100%)",
          width: width,
        }}
      ></div>
    </div>
  );
};
