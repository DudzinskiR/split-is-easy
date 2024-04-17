import { GridCursorOverlay, Phone3D, Ping } from "src/components";
import { useRotatePhones } from "../main-segment/hooks";
import { Vector2 } from "src/utils/math";
import { FeatureSegmentTimeline } from "./components";
import { timelineNodesA, timelineNodesB } from "./feature-segment.const";
import { LoadingPageScreenshot1 } from "src/assets/landing-page";
import { HomeTitle } from "../../home-title";

export const FeatureSegment = () => {
  const { rotation, phonesRef, containerRef } = useRotatePhones();

  return (
    <div
      className="relative main-background-gradient w-full min-h-[700px] flex flex-row justify-center items-center"
      ref={containerRef}
    >
      <div className="absolute top-7 z-10">
        <HomeTitle color={"WHITE"} text={"Feature"} />
      </div>
      <GridCursorOverlay />
      <div className="absolute absolute-center w-[800px] h-[800px] opacity-40 md:opacity-100">
        <Ping
          position={new Vector2(0, 0)}
          size={800}
          number={5}
          delay={5000}
          background={"#FFFFFF55"}
        />
      </div>
      <div className="absolute hidden 2xs:block">
        <FeatureSegmentTimeline
          className="absolute-center-y lg:left-[-150px] md:left-[-120px] h-[500px]"
          nodes={timelineNodesA}
          align={"RIGHT"}
        />
        <FeatureSegmentTimeline
          className="absolute-center-y lg:left-[150px] md:left-[120px] h-[500px]"
          nodes={timelineNodesB}
          align={"LEFT"}
        />
      </div>
      <div className="block 2xs:hidden text-center">
        {[...timelineNodesA].map((item, index) => (
          <div key={index} className="my-3 pb-3 flex flex-col items-center">
            <div className="text-2xl text-white font-semibold">
              {item.subtile}
            </div>
            <div className="text-lg text-white/70 w-3/4">
              {item.description}
            </div>
          </div>
        ))}
      </div>
      <div className="transform-style-preserve-3d perspective-2000 w-[250px] h-[525px] scale-[0.75] lg:scale-100 hidden md:block">
        <div
          className="transform-style-preserve-3d w-[250px] h-[640px] "
          ref={phonesRef}
          style={{
            transform: `translateX(0px) rotateY(${
              -rotation.x * 50
            }deg) rotateX(${rotation.y * 25}deg)`,
          }}
        >
          <Phone3D
            width={250}
            height={25}
            length={525}
            radius={30}
            img={LoadingPageScreenshot1}
          />
        </div>
      </div>
    </div>
  );
};
