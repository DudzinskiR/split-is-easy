import React from "react";
import { Button, RandomRevealText } from "src/components";
import { useAccelerometer } from "src/hooks";
import { twJoin } from "tailwind-merge";

interface DescriptionProps {
  delay: number;
}

export const Description = React.memo(({ delay }: DescriptionProps) => {
  const a = useAccelerometer();
  console.log(a);
  return (
    <div
      className={twJoin(
        "absolute max-xl:w-full",
        // "transform3D-[translateX(0px)_translateY(-50%)] left-0",

        "xl:transform3D-[translateX(-0%)_translateY(-50%)] xl:top-1/2 xl:left-0",
        "lg:top-[225px]",
        "transform3D-[translateX(-50%)_translateY(-50%)] left-1/2 top-[175px]"
      )}
    >
      <RandomRevealText
        className="text-center 2xl:text-6xl lg:text-5xl text-3xl font-bold text-white"
        text={`Shared Bills x:${a?.x || "brak"}`}
        delay={delay}
      />
      <RandomRevealText
        className="text-center 2xl:text-6xl lg:text-5xl text-3xl font-bold text-white lg:mt-2 mt-0"
        text="Shared Experiences"
        delay={delay + 0.5}
      />
      <RandomRevealText
        className="text-center 2xl:text-3xl lg:text-2xl text-lg font-bold text-white lg:mt-10 mt-2"
        text="Our app makes finances easy and enjoyable!"
        delay={delay + 1.5}
      />
      <div className="flex flex-col items-center w-full lg:mt-10 mt-2 text-xl animate-reveal opacity-0 animation-fill-forwards animation-delay-4000">
        <div className="flex flex-row justify-between w-full lg:max-w-[400px] max-w-[300px]">
          <Button
            color="bg-white hover:bg-slate-200 text-indigo-700"
            className="lg:w-40 w-[100px]"
            text="Login"
            to="/login"
          />
          <Button
            color="bg-white hover:bg-slate-200 text-indigo-700"
            className="lg:w-40 w-[100px]"
            text="Sign up"
            to="/login?t=sign-up"
          />
        </div>
      </div>
    </div>
  );
});
