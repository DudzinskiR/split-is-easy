import { PhoneBack, PhoneCorner, PhoneFront, PhoneSide } from "./components";
import { Phone3DContextProvider } from "./context/phone-3D.context";

export interface Phone3DProps {
  text: string;

  width: number;
  height: number;
  length: number;
  radius: number;
  cornerNode?: number;
  perspective?: number;
}

const Phone3D = ({
  text,
  width,
  height,
  length,
  radius,
  perspective = 500,
  cornerNode = 3,
}: Phone3DProps) => {
  return (
    <Phone3DContextProvider
      value={{ text, width, height, length, radius, cornerNode, perspective }}
    >
      <div className="absolute absolute-center">
        <div
          style={{
            perspective: `${perspective}px`,
          }}
        >
          <div
            style={{
              transformStyle: "preserve-3d",
              transform: "rotateZ(0deg) rotateY(0deg) rotateX(0deg)",
              width: width,
              height: length,
              transformOrigin: "center",
            }}
          >
            <PhoneFront text={text} />
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
                transform={`rotateZ(90deg) translateY(-${
                  width - radius * 2
                }px)`}
              />
              <PhoneCorner
                transform={`translateY(${
                  length - radius * 2
                }px) rotateZ(270deg)`}
              />
              <PhoneCorner
                transform={`translateY(${length - radius * 2}px) 
                translateX(${width - radius * 2}px)
                rotateZ(180deg)`}
              />
            </>
          </div>
        </div>
      </div>
    </Phone3DContextProvider>
  );
};

export default Phone3D;
