import { PhoneBack, PhoneFront } from "./components";

interface Phone3DProps {
  text: string;
  width: number;
  height: number;
  length: number;
}

const Phone3D = ({ text, width, height, length }: Phone3DProps) => {
  return (
    <div>
      <div
        className="absolute absolute-center"
        style={{
          transformStyle: "preserve-3d",
          transform:
            "rotateX(0deg) rotateY(180deg) rotateZ(0deg) perspective(5000px)",
          transformOrigin: "center",
          width: width,
          height: height,
        }}
      >
        <PhoneFront text={text} width={width} height={height} length={length} />
        <PhoneBack width={width} height={height} />
      </div>
    </div>
  );
};

export default Phone3D;
