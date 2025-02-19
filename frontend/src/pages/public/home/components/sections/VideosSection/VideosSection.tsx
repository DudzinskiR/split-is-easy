import { useState } from "react";
import { useFadeInOnVisible } from "src/hooks/useFadeInOnVisible/useFadeInOnVisible";
import { useTimers } from "src/hooks/useTimers/useTimers";
import { twJoin } from "tailwind-merge";

import { VideoDescription } from "./components/VideoDescription";
import { VideoPlayer } from "./components/VideoPlayer";
import { videosData } from "./const/videosData";

export const VideosSection = () => {
  const [progress, setProgress] = useState(0);
  const [currentVideo, setCurrentVideo] = useState(0);
  const { newTimer } = useTimers();
  const { isVisible, ref } = useFadeInOnVisible({ offset: 800 });

  return (
    <div className="bg-[#070818] py-5 pb-16 flex justify-center" ref={ref}>
      <div
        className={twJoin(
          "flex flex-col lg:flex-row justify-between max-w-8xl w-full gap-5 lg:gap-1 xl:gap-10 duration-500",
          isVisible ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="flex flex-col gap-5 mr-5 lg:mr-0 ml-5">
          {videosData.map((item, index) => (
            <VideoDescription
              key={index}
              isActive={index === currentVideo}
              title={item.title}
              description={item.description}
              progress={progress}
              onClick={() => {
                setCurrentVideo(index);
                newTimer(() => {
                  setProgress(0);
                }, 100);
              }}
              color={item.color}
              icon={item.icon}
            />
          ))}
        </div>
        <VideoPlayer
          src={videosData[currentVideo % videosData.length].src}
          onEnded={() =>
            newTimer(() => {
              setCurrentVideo((prev) => (prev + 1) % videosData.length);
            }, 1000)
          }
          className=""
          onProgress={(val) => setProgress(val)}
        />
      </div>
    </div>
  );
};
