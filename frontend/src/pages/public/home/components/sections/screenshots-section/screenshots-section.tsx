import { lazy, Suspense, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Background2, Background3 } from "src/assets/landing-page/background";
import { Ping } from "src/components/ping/ping.component";
import { useFadeInOnVisible } from "src/hooks/fade-in-on-visible/fade-in-on-visible";
import { Vector2 } from "src/utils/math/vector/vector-2";
import { twJoin, twMerge } from "tailwind-merge";

const PhoneCanvas = lazy(() =>
  import("./components/phone-canvas").then((module) => ({
    default: module.PhoneCanvas,
  }))
);
export const ScreenshotsSection = () => {
  const [screenshotIndex, setScreenshotIndex] = useState(0);
  const { ref: elementRef, isVisible } = useFadeInOnVisible({
    offset: 500,
  });
  return (
    <div className="bg-[#0e1129] h-screen max-h-[1000px] w-full relative">
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
      <div className="absolute absolute-center w-[800px] h-[800px]">
        <Ping
          position={new Vector2(0, 0)}
          size={800}
          number={5}
          delay={3000}
          background={"#ffffff10"}
        />
      </div>

      <div
        className={twJoin(
          "h-full w-full duration-[3000ms]",
          isVisible ? "opacity-100" : "opacity-0"
        )}
        ref={elementRef}
      >
        <Suspense>
          <PhoneCanvas screenshotIndex={screenshotIndex} />
        </Suspense>
      </div>
      <div
        className={twMerge(
          "text-white absolute absolute-center-x top-[80px] text-5xl p-5 bg-clip-padding backdrop-filter backdrop-blur bg-[#04050e] bg-opacity-30 rounded-lg border-2 border-slate-700 duration-1000",
          isVisible ? "opacity-100" : "opacity-0"
        )}
      >
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
