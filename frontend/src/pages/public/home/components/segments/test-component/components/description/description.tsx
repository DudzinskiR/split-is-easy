import React from "react";
import { Button, RandomRevealText } from "src/components";

interface DescriptionProps {
  delay: number;
}

export const Description = React.memo(({ delay }: DescriptionProps) => {
  return (
    <div className="absolute absolute-center-y w-1/2">
      <RandomRevealText
        className="text-center text-6xl font-bold text-white"
        text="Shared Bills"
        delay={delay}
      />
      <RandomRevealText
        className="text-center text-6xl font-bold text-white mt-2"
        text="Shared Experiences"
        delay={delay + 0.5}
      />
      <RandomRevealText
        className="text-center text-3xl font-bold text-white mt-10"
        text="Our app makes finances easy and enjoyable!"
        delay={delay + 1.5}
      />
      <div
        className="flex flex-row justify-around mt-10 text-xl animate-reveal opacity-0"
        style={{ animationDelay: "4s", animationFillMode: "forwards" }}
      >
        <Button
          color="bg-white hover:bg-slate-200 text-indigo-700"
          className="w-40"
          text="Login"
          to="/login"
        />
        <Button
          color="bg-white hover:bg-slate-200 text-indigo-700"
          className=" w-40"
          text="Sign up"
          to="/login?t=sign-up"
        />
      </div>
    </div>
  );
});
