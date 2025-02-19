import { Background1 } from "src/assets/landing-page/background";
import { Button } from "src/components/Button/Button";
import { Ping } from "src/components/Ping/Ping";
import { RandomRevealText } from "src/components/RandomRevealText/RandomRevealText";
import { Vector2 } from "src/utils/math/vector/Vector2";
import { twJoin } from "tailwind-merge";

export const HeroSection = () => {
  return (
    <>
      <div className="relative flex justify-center h-[850px] max-h-[100vh] w-screen bg-[#0e1129]">
        <Background1 className="absolute right-0 top-0" />
        <Ping
          position={new Vector2(100, 350)}
          size={500}
          number={5}
          delay={5000}
          background={"#ffffff05"}
        />
        <div className="relative max-w-7xl w-full h-full">
          <div className="absolute lg:ml-[50px] lg:absolute-center-y w-full lg:w-[650px] top-[100px] text-center flex flex-col items-center">
            <RandomRevealText
              text={"Shared Bills"}
              className="text-center 2xl:text-6xl lg:text-5xl text-3xl font-bold text-white"
              delay={0.5}
            />
            <RandomRevealText
              text={"Shared Experiences"}
              className="text-center 2xl:text-6xl lg:text-5xl text-3xl font-bold text-white lg:mt-2 mt-0"
              delay={1}
            />
            <RandomRevealText
              text={"Our app makes finances easy and enjoyable!"}
              className="text-center 2xl:text-3xl lg:text-2xl text-lg font-bold text-white lg:mt-10 mt-2"
              delay={1.5}
            />
            <div className="w-[200px] mt-10 animate-reveal animation-fill-forwards animation-delay-4000 opacity-0">
              <Button
                color="bg-white hover:bg-slate-200 text-slate-900 text-2xl"
                className="lg:w-40 w-[100px]"
                text="Login"
                to="/login"
              />
            </div>
          </div>
          <div
            className={twJoin(
              "absolute right-[50%] translate-x-[50%] md:size-[600px]",
              "size-[90vw] top-[300px]",
              "lg:top-[50px] lg:size-[700px] lg:right-[-80px] lg:translate-x-0"
            )}
          >
            <img src="/img/render3D.png" />
          </div>
        </div>
      </div>
    </>
  );
};
