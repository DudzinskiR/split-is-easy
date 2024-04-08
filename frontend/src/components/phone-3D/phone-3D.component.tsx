import { Vector3 } from "src/types";
import { PhoneBack, PhoneCorner, PhoneFront, PhoneSide } from "./components";
import { Phone3DContextProvider } from "./context/phone-3D.context";

export interface Phone3DProps {
  width: number;
  height: number;
  length: number;
  radius: number;
  cornerNode?: number;
  perspective?: number;
  rotate?: Vector3;
  position?: Vector3;
}

export const Phone3D = ({
  width,
  height,
  length,
  radius,
  rotate = { x: 0, y: 0, z: 0 },
  position = { x: 0, y: 0, z: 0 },
  perspective,
  cornerNode = 3,
}: Phone3DProps) => {
  return (
    <Phone3DContextProvider
      value={{
        width,
        height,
        length,
        radius,
        cornerNode,
        perspective,
        position,
        rotate,
      }}
    >
      <div style={{ transformStyle: "preserve-3d", perspective: perspective }}>
        <div
          style={{
            transitionDuration: "1000ms",
            position: "absolute",
            transformStyle: "preserve-3d",
            transform: `translate3d(${position.x}px, ${position.y}px, ${position.z}px) rotateZ(${rotate.z}deg) rotateY(${rotate.y}deg) rotateX(${rotate.x}deg)`,
            width: width,
            height: length,
            transformOrigin: "center",
          }}
        >
          <PhoneFront />
          <PhoneBack />
          <>
            <PhoneSide
              transform={`translateY(${radius}px) translateZ(${
                height / 2
              }px) rotateY(90deg)`}
              height={length - radius * 2}
              width={height}
            />
            <PhoneSide
              transform={`translateY(${radius}px) translateX(${width}px) translateZ(${
                height / 2
              }px) rotateY(90deg)`}
              height={length - radius * 2}
              width={height}
            />
            <PhoneSide
              transform={`translateZ(${
                -height / 2
              }px) rotateZ(270deg) rotateY(270deg)`}
              height={width - radius * 2}
              left={radius}
              width={height}
            />
            <PhoneSide
              transform={`translateY(${length}px) translateX(${
                width - radius
              }px) translateZ(${height / 2}px) rotateZ(90deg) rotateY(90deg)`}
              height={width - radius * 2}
              width={height}
            />
          </>
          <>
            <PhoneCorner transform={""} />
            <PhoneCorner
              transform={`rotateZ(90deg) translateY(-${width - radius * 2}px)`}
            />
            <PhoneCorner
              transform={`translateY(${length - radius * 2}px) rotateZ(270deg)`}
            />
            <PhoneCorner
              transform={`translateY(${length - radius * 2}px) 
                translateX(${width - radius * 2}px)
                rotateZ(180deg)`}
            />
          </>
        </div>
      </div>
    </Phone3DContextProvider>
  );
};
