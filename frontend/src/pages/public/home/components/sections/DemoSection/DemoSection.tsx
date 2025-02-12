import { Background2, Background3 } from "src/assets/landing-page/background";
import { Ping } from "src/components/Ping/Ping";
import { useFadeInOnVisible } from "src/hooks/useFadeInOnVisible/useFadeInOnVisible";
import { Vector2 } from "src/utils/math/vector/Vector2";
import { twJoin } from "tailwind-merge";

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
      <div className="h-[1000px]"></div>
    </div>
  );
};
