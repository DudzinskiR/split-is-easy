import { useState } from "react";
import { useTimers } from "src/hooks/timers/timers.hook";

import { VideoDescription } from "./components/video-description";
import { VideoPlayer } from "./components/video-player";
import { videosData } from "./const/videos-data";

export const VideosSection = () => {
  const [progress, setProgress] = useState(0);
  const [currentVideo, setCurrentVideo] = useState(0);
  const { newTimer } = useTimers();

  return (
    <div className="bg-[#070818] py-5 flex justify-center">
      <div className="flex justify-between max-w-8xl w-full gap-10">
        <div className="flex flex-col gap-5 ml-5">
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
