import { GridCursorOverlay, Phone3D, Ping } from "src/components";
import { FaqRow } from "./components";
import { questions } from "./const";
import { useRotatePhones } from "../main-segment/hooks";
import { Vector2 } from "src/utils/math";
import { HomeTitle } from "../../home-title";

export const FaqSegment = () => {
  const { rotation, phonesRef, containerRef } = useRotatePhones();

  return (
    <div
      className="relative w-full main-background-gradient pb-5 flex justify-center"
      ref={containerRef}
    >
      <GridCursorOverlay />
      <div className="relative max-w-7xl w-full">
        <div className="text-white text-center text-4xl my-5 font-semibold">
          FAQ
      <div className="relative max-w-7xl w-full flex flex-col justify-center items-center">
        <div className="my-8">
          <HomeTitle color={"WHITE"} text={"FAQ"} />
        </div>
        <div className="flex flex-col gap-5 mx-5 lg:mx-16 mb-5">
          {questions.map((item, index) => (
            <div key={index} className="lg:w-[700px] w-full relative">
              <FaqRow
                question={`${index + 1}. ${item.question}`}
                answer={item.answer}
                isOpen={index === 1}
              />
            </div>
          ))}
        </div>
        <div className="lg:block hidden">
          <div className="absolute w-[250px] h-[525px] absolute-center-y right-[125px]">
            <Ping
              position={new Vector2(0, 0)}
              size={500}
              number={3}
              delay={3000}
              background={"#FFFFFF88"}
            />
          </div>
          <div className="absolute transform-style-preserve-3d perspective-2000 w-[250px] h-[525px] absolute-center-y right-0 scale-[0.75] lg:scale-[0.75] hidden md:block">
            <div
              className="transform-style-preserve-3d w-[250px] h-[640px] z-10"
              ref={phonesRef}
              style={{
                transform: `translateX(0px) rotateY(${
                  -rotation.x * 50
                }deg) rotateX(${rotation.y * 25}deg)`,
              }}
            >
              <Phone3D width={250} height={25} length={525} radius={30} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
