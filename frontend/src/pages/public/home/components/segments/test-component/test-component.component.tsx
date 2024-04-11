import { useEffect, useState } from "react";
// import { Button } from "src/components";
// import { ButtonColor } from "src/enums";
import { useTimers } from "src/hooks";

import { Pings } from "./components";
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

const TestComponent = () => {
  const [phoneATransform, setPhoneATransform] = useState(startPhoneATransform);
  const [phoneBTransform, setPhoneBTransform] = useState(startPhoneBTransform);

  const { rotation, phonesRef } = useRotatePhones();
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
      className="w-full h-screen select-none relative flex justify-center"
      style={{
        background:
          "linear-gradient(45deg, rgba(0,0,70,1) 0%, rgba(79,28,150,1) 33%, rgba(28,181,224,1) 100%)",
      }}
    >
      <div className="relative max-w-7xl w-screen h-full">
        <Description delay={2} />
        <div
          className="right-0 top-1/2 translate-y-[calc(-50%+50px)] scale-[0.85]"
          ref={phonesRef}
          style={{
            position: "absolute",
            perspective: 1000 * multiply,
            width: 250 * multiply,
            height: 500 * multiply,
          }}
        >
          <div className="absolute w-[500px] h-[100px] bg-black/70 rounded-full blur-2xl top-[600px] left-[-50px]"></div>
          <div
            className=""
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
        <Pings />
      </div>
    </div>
  );
};

export default TestComponent;
