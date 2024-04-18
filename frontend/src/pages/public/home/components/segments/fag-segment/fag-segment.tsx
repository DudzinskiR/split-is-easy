import { GridCursorOverlay, Ping } from "src/components";
import { FaqRow } from "./components";
import { questions } from "./const";
import { Vector2 } from "src/utils/math";
import { HomeTitle } from "../../home-title";

export const FaqSegment = () => {
  return (
    <div className="relative w-full main-background-gradient pb-5 flex justify-center">
      <GridCursorOverlay />
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
        <div className="lg:block hidden pointer-events-none">
          <div className="absolute absolute-center size-[500px]">
            <Ping
              position={new Vector2(-400, 0)}
              size={500}
              number={3}
              delay={5000}
              background={"#FFFFFF11"}
            />
          </div>
          <div className="absolute absolute-center size-[500px] ">
            <Ping
              position={new Vector2(400, 0)}
              size={500}
              number={3}
              delay={5000}
              background={"#FFFFFF11"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
