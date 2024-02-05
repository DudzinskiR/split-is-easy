import { ReactNode, useEffect, useState } from "react";
import { useTimers } from "src/hooks";
import { twMerge } from "tailwind-merge";
import { FadeInOut } from "src/components";
import { ModalWrapperProps } from "src/interfaces";

export const ModalWrapper = ({
  children,
  onRejected,
  isOpen,
  styles,
  duration = 150,
  className,
  ...divProps
}: ModalWrapperProps & { children: ReactNode }) => {
  const [isLocalOpen, setLocalOpen] = useState(false);
  const { newTimer, clearAllTimers } = useTimers();

  useEffect(() => {
    if (isOpen) {
      newTimer(() => {
        setLocalOpen(true);
      }, 0);
    } else {
      newTimer(() => {
        setLocalOpen(false);
      }, duration);
    }

    return () => clearAllTimers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);
  if (!(isLocalOpen || isOpen)) return null;
  return (
    <>
      <div
        className={twMerge(
          "bg-black h-screen w-screen fixed top-0 left-0 opacity-60 z-50",
          styles?.background
        )}
        onClick={onRejected}
      ></div>
      <div
        className={twMerge(
          "fixed left-1/2 top-1/2 translate-x-[-50%] -translate-y-[50%] md:-translate-y-[calc(50%+70px)] z-50",
          styles?.container
        )}
      >
        <FadeInOut isOpen={isOpen} transitionDuration={duration}>
          <div
            className={twMerge(
              "bg-slate-50 p-5 rounded md:max-w-lg md:w-screen w-[calc(100vw-35px)] shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.3)] md:duration-150 border-2 border-slate-500",
              styles?.body,
              className
            )}
            {...divProps}
          >
            {children}
          </div>
        </FadeInOut>
      </div>
    </>
  );
};
