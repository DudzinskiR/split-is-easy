import { lazy, Suspense, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Background2, Background3 } from "src/assets/landing-page/background";
import { Ping } from "src/components/ping/ping.component";
import { useElementPosition } from "src/hooks/element-position/element-position";
import { useOffsetScrollY } from "src/hooks/offset-scroll-y/offset-scroll-y";
import { useWindowSize } from "src/hooks/window-size/window-size.hook";
import { smoothStep } from "src/utils/helpers/smooth-step/smooth-step";
import { Vector2 } from "src/utils/math/vector/vector-2";

const PhoneCanvas = lazy(() =>
  import("./components/phone-canvas").then((module) => ({
    default: module.PhoneCanvas,
  }))
);
export const ScreenshotsSection = () => {
  const [screenshotIndex, setScreenshotIndex] = useState(0);
  const { offsetScrollY } = useOffsetScrollY();
  const { ref, position } = useElementPosition();
  const { height } = useWindowSize();

  return (
    <div
      className="bg-[#0e1129] h-screen max-h-[1000px] w-full relative"
      ref={ref}
    >
      <Background2
        className="absolute bottom-0"
        style={{
          left: `${
            smoothStep(offsetScrollY - position.y + height, height + 200) *
              500 -
            500
          }px`,
        }}
      />
      <Background3
        className="absolute top-0"
        style={{
          right: `${
            smoothStep(offsetScrollY - position.y + height - 200, height) *
              500 -
            500
          }px`,
        }}
      />
      <div className="absolute absolute-center w-[800px] h-[800px]">
        <Ping
          position={new Vector2(0, 0)}
          size={800}
          number={5}
          delay={3000}
          background={"#ffffff10"}
        />
      </div>

      <div className="h-full">
        <Suspense>
          <PhoneCanvas screenshotIndex={screenshotIndex} />
        </Suspense>
      </div>
      <div className="text-white absolute absolute-center-x top-[80px] text-5xl p-5 bg-clip-padding backdrop-filter backdrop-blur bg-[#04050e] bg-opacity-30 rounded-lg border-2 border-slate-700">
        Screenshots
      </div>
      <div
        className="absolute h-screen top-0 w-1/2 flex justify-center items-center group"
        onClick={() => setScreenshotIndex((prev) => prev - 1)}
      >
        <div className="relative text-slate-200 text-6xl group-hover:text-8xl duration-300">
          <IoIosArrowBack />
        </div>
      </div>

      <div
        className="absolute h-screen top-0 w-1/2 right-0 flex justify-center items-center group"
        onClick={() => setScreenshotIndex((prev) => prev + 1)}
      >
        <div className="relative text-slate-200 text-6xl group-hover:text-8xl duration-300">
          <IoIosArrowForward />
        </div>
      </div>
    </div>
  );
};
