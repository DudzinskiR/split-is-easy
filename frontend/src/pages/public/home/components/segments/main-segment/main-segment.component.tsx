import { useEffect, useState } from "react";
import { GridCursorOverlay } from "src/components";
import { useTimers } from "src/hooks";
import { twJoin } from "tailwind-merge";

import { Description, Pings } from "./components";
import { Phones } from "./components/phones/phones";
import {
  finishPhoneATransform,
  finishPhoneBTransform,
  startPhoneATransform,
  startPhoneBTransform,
} from "./const";
import { useRotatePhones } from "./hooks";

const multiply = 1.5;

export const MainSegment = () => {
  const [phoneATransform, setPhoneATransform] = useState(startPhoneATransform);
  const [phoneBTransform, setPhoneBTransform] = useState(startPhoneBTransform);

  const { rotation, phonesRef, containerRef } = useRotatePhones();
  const { newTimer, clearAllTimers } = useTimers();

  useEffect(() => {
    newTimer(() => {
      setPhoneATransform(finishPhoneATransform);
      setPhoneBTransform(finishPhoneBTransform);
    }, 250);

    return clearAllTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-screen min-h-[600px] 2xs:min-h-[800px] sm:min-h-[1000px] relative flex justify-center"
      style={{
        background:
          "linear-gradient(45deg, rgba(0,0,70,1) 0%, rgba(79,28,150,1) 33%, rgba(28,181,224,1) 100%)",
      }}
    >
      <GridCursorOverlay />
      <div className="relative max-w-7xl w-screen h-full">
        <Description delay={3} />
        <div
          className={twJoin(
            "transform-style-preserve-3d absolute w-[600px] h-[800px]",
            "transform3D-[scale(0.35)_translate3d(calc(-50%-400px),calc(50%-100px),0px)] left-1/2",
            "2xs:transform3D-[scale(0.6)_translate3d(calc(-50%-200px),calc(50%-100px),0px)] 2xs:left-1/2",
            "sm:transform3D-[scale(0.6)_translate3d(calc(-50%-200px),calc(50%+100px),0px)] sm:left-1/2",
            "md:transform3D-[scale(0.8)_translate3d(calc(-50%-100px),calc(calc(50%)),0px)] md:left-1/2",
            "xl:transform3D-[scale(0.75)_translate3d(calc(50%-200px),-50%,0px)] xl:top-1/2 xl:left-1/2",
            "2xl:transform3D-[scale(0.85)_translate3D(50%,-50%,0px)] 2xl:top-1/2 2xl:left-1/2 "
          )}
          ref={phonesRef}
          style={{
            position: "absolute",
            perspective: 1000 * multiply,
            width: 250 * multiply,
            height: 500 * multiply,
          }}
        >
          <div
            style={{
              transformStyle: "preserve-3d",
              width: 300 * multiply,
              height: 300 * multiply,
              position: "absolute",
              transform: `translateX(0px) rotateY(${
                -rotation.x * 25
              }deg) rotateX(${rotation.y * 25 - 10}deg)`,
              transformOrigin: "center",
            }}
          >
            <div className={"transform-style-preserve-3d"}>
              <Phones
                transformA={phoneATransform}
                transformB={phoneBTransform}
                width={300}
                height={30}
                length={640}
                radius={30}
                transitionDuration={3000}
              />
            </div>
          </div>
        </div>
        <Pings />
      </div>
    </div>
  );
};
