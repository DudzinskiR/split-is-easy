import { Background2, Background3 } from "src/assets/landing-page/background";
import { Button } from "src/components/Button/Button";
import { Ping } from "src/components/Ping/Ping";
import { ButtonColor } from "src/enums/ButtonColor/ButtonColor";
import { useFadeInOnVisible } from "src/hooks/useFadeInOnVisible/useFadeInOnVisible";
import { Vector2 } from "src/utils/math/vector/Vector2";
import { twJoin, twMerge } from "tailwind-merge";

export const DemoSection = () => {
  const { ref: elementRef, isVisible } = useFadeInOnVisible({
    offset: 500,
  });

  return (
    <div className="bg-[#0e1129] w-full relative">
      <Background2
        className={twJoin(
          "absolute bottom-0 duration-[3000ms]",
          isVisible ? "left-0 opacity-100" : "left-[-500px] opacity-0"
        )}
      />
      <Background3
        className={twJoin(
          "absolute top-0 duration-[3000ms]",
          isVisible ? "right-0 opacity-100" : "right-[-500px] opacity-0"
        )}
      />
      <div
        className="absolute absolute-center w-[800px] h-[800px]"
        ref={elementRef}
      >
        <Ping
          position={new Vector2(0, 0)}
          size={800}
          number={5}
          delay={3000}
          background={"#ffffff10"}
        />
      </div>
      <div className="min-h-[800px]">
        <div
          className={twMerge(
            "text-white absolute absolute-center-x top-[80px] text-5xl p-5 bg-clip-padding backdrop-filter backdrop-blur bg-[#04050e] bg-opacity-30 rounded-lg border-2 border-slate-700 duration-1000",
            isVisible ? "opacity-100" : "opacity-0"
          )}
        >
          DEMO
        </div>
        <div className="absolute absolute-center">
          <div className="flex flex-col items-center">
            <p className="text-4xl text-white font-semibold">
              Check out how Split Is Easy works
            </p>
            <Button
              text="Demo version"
              className="mt-10 w-[400px]"
              color={ButtonColor.PURPLE}
              to="/demo"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
