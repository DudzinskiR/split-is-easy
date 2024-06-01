import { useEffect, useRef, useState } from "react";
import { useTimers } from "src/hooks/timers/timers.hook";
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
      className={twMerge("bg-slate-800 p-3", className)}
      onClick={playButtonHandler}
    >
      <video
        className={twJoin(
          "w-full duration-300",
          isShow ? "opacity-100" : "opacity-0"
        )}
        src={localSrc}
        muted
        onEnded={onEnded}
        ref={videoRef}
        onTimeUpdate={onTimeHandler}
      />
      <button
        className="bg-red-500 size-[30px] mt-3 ml-3"
        onClick={playButtonHandler}
      ></button>
    </div>
  );
};
