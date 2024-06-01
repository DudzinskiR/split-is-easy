import newPaymentVideo from "src/assets/videos/new-payment-video.mp4";
import customPaymentVideo from "src/assets/videos/custom-payment.mp4";
import { VideoPlayer } from "./video-player";
import { VideoDescription } from "./video-description";
import { useState } from "react";

type VideoData = {
  src: string;
  title: string;
  description: string;
};

const videosData: VideoData[] = [
  {
    src: newPaymentVideo,
    title: "New payment",
    description: "Lorem ipsum",
  },
  {
    src: customPaymentVideo,
    title: "Settle",
    description: "Lorem ipsum",
  },
  {
    src: newPaymentVideo,
    title: "Custom payment",
    description: "Lorem ipsum",
  },
  {
    src: newPaymentVideo,
    title: "Virtual user",
    description: "Lorem ipsum",
  },
];

export const VideosSection = () => {
  const [progress, setProgress] = useState(0);
  const [currentVideo, setCurrentVideo] = useState(0);

  return (
    <div className="bg-[#070818] py-5 flex justify-center">
      <div className="flex justify-between max-w-8xl w-full gap-10">
        <div className="flex flex-col gap-5 w-3/4 ml-5">
          {videosData.map((item, index) => (
            <VideoDescription
              key={index}
              isActive={index === currentVideo}
              title={item.title}
              description={item.description}
              progress={progress}
              onClick={() => {
                setCurrentVideo(index);
                setProgress(0);
              }}
            />
          ))}
        </div>
        <VideoPlayer
          src={videosData[currentVideo % videosData.length].src}
          onEnded={() =>
            setCurrentVideo((prev) => (prev + 1) % videosData.length)
          }
          className="w-full"
          onProgress={(val) => setProgress(val)}
        />
      </div>
    </div>
  );
};
