import { useEffect, useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { useTimers } from "src/hooks/useTimers/useTimers";
import { twJoin, twMerge } from "tailwind-merge";

interface VideoPlayerProps {
  className?: string;
  src: string;
  onEnded: () => void;
  onProgress: (progress: number) => void;
}

export const VideoPlayer = ({
  src,
  onEnded,
  className,
  onProgress,
}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlay, setPlay] = useState(false);
  const [isShow, setShow] = useState(true);
  const [localSrc, setLocalSrc] = useState("");
  const { newTimer, clearAllTimers } = useTimers();
  const playButtonHandler = () => {
    if (!videoRef.current) return;

    if (isPlay) {
      videoRef.current.pause();
      setPlay(false);
    } else {
      videoRef.current.play();
      setPlay(true);
    }
  };

  useEffect(() => {
    setShow(false);
    videoRef.current?.pause();
    onProgress(0);
    newTimer(() => {
      setShow(true);
      setLocalSrc(src);
      newTimer(() => {
        videoRef.current?.load();
        videoRef.current?.play();
      }, 100);
    }, 500);

    return () => clearAllTimers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  const onTimeHandler = () => {
    if (!videoRef.current) return;

    onProgress(videoRef.current.currentTime / videoRef.current.duration);
  };

  return (
    <div
      className={twMerge("bg-[#0e1129] p-3 pb-0 rounded-xl mx-5", className)}
      onClick={playButtonHandler}
    >
      <div className="w-full flex justify-center">
        <video
          className={twJoin(
            "duration-300 h-[700px] w-[700px]",
            isShow ? "opacity-100" : "opacity-0"
          )}
          src={localSrc}
          muted
          onEnded={onEnded}
          ref={videoRef}
          onTimeUpdate={onTimeHandler}
        />
      </div>
      <button
        className="size-[30px] mt-3 ml-3 mb-3 text-2xl text-white/50"
        onClick={playButtonHandler}
      >
        {isPlay ? <FaPause /> : <FaPlay />}
      </button>
    </div>
  );
};
