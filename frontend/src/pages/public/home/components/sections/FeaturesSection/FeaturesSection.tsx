import { PiRocket } from "react-icons/pi";
import { MoneyImage, NoteImage, ServerImage } from "src/assets/landing-page";
import { useFadeInOnVisible } from "src/hooks/useFadeInOnVisible/useFadeInOnVisible";
import { twJoin } from "tailwind-merge";

import { FeatureBox } from "./components/FeatureBox/FeatureBox";

export const FeaturesSection = () => {
  const { ref, isVisible } = useFadeInOnVisible();
  return (
    <div className="w-screen lg:h-[900px] bg-[#070818] flex justify-center">
      <div className="relative h-full max-w-7xl w-full">
        <div className="text-slate-100 absolute-center-x absolute top-[90px] text-5xl hidden lg:block">
          Features
        </div>
        <div
          className={twJoin(
            "lg:absolute mt-32 right-0  top-[125px] duration-1000",
            "lg:w-[30vw] lg:top-[300px] lg:mr-10",
            "xl:w-[500px]",
            isVisible ? "opacity-100" : "opacity-0 top-[175px] lg:top-[350px]"
          )}
          ref={ref}
        >
          <PiRocket className="text-orange-500 absolute text-6xl top-10 lg:top-[-80px] absolute-center-x" />
          <div className="text-white text-6xl font-semibold text-center">
            We care about your comfort
          </div>
          <div className="text-slate-200 text-center text-3xl mt-10">
            Our goal is to provide you with the best tool for sharing expenses
          </div>
        </div>
        <div className="h-full relative flex lg:block flex-col gap-10 items-center mt-10 lg:mt-0 mb-10">
          <FeatureBox
            className="lg:absolute lg:top-[50px] lg:ml-5"
            img={MoneyImage}
            title={"Quick split"}
            subtitle={"We provide instant calculation of dues"}
          />
          <FeatureBox
            className="lg:absolute xl:left-[350px] lg:left-[300px] lg:top-[300px] lg:ml-5"
            img={ServerImage}
            title={"Full synchronization"}
            subtitle={"We automatically sync new payments"}
          />
          <FeatureBox
            className="lg:absolute lg:ml-5 lg:top-[500px]"
            img={NoteImage}
            title={"Payment history"}
            subtitle={"Review your group's expenses anytime"}
          />
        </div>
      </div>
    </div>
  );
};
