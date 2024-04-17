import { Transform3D } from "src/utils/math";
import { PhoneBack, PhoneCorner, PhoneFront, PhoneSide } from "./components";
import { Phone3DContextProvider } from "./context/phone-3D.context";
import React, { Fragment, ReactNode } from "react";

export interface Phone3DProps {
  width: number;
  height: number;
  length: number;
  radius: number;
  cornerNode?: number;
  perspective?: number;
  transform?: Transform3D;
  transitionDuration?: number;
  additionalElements?: ReactNode[];
  img?: string;
}

const Phone3D = React.memo(
  ({
    width,
    height,
    length,
    radius,
    transform,
    perspective,
    additionalElements,
    cornerNode = 3,
    transitionDuration = 3000,
    img,
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
          img,
        }}
      >
        <div
          style={{ transformStyle: "preserve-3d", perspective: perspective }}
        >
          <div
            style={{
              transitionDuration: `${transitionDuration}ms`,
              position: "absolute",
              transformStyle: "preserve-3d",
              transform: transform?.toCSS(),
              width: width,
              height: length,
              transformOrigin: "center",
            }}
          >
            {additionalElements?.map((item, index) => {
              return <Fragment key={index}>{item}</Fragment>;
            })}
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
      </Phone3DContextProvider>
    );
  }
);

export { Phone3D };
