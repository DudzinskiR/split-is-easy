import { useEffect, useRef, useState } from "react";
import { useTimers } from "../useTimers/useTimers";

interface UseFadeInOnVisibleProps {
  offset?: number;
  timeout?: number;
}

export const useFadeInOnVisible = (props?: UseFadeInOnVisibleProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { newTimer, clearAllTimers } = useTimers();
  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const isVisible =
        rect.top + (props?.offset || 0) >= 0 &&
        rect.bottom - (props?.offset || 0) <= window.innerHeight;

      if (isVisible) {
        newTimer(() => {
          setIsVisible(isVisible);
        }, props?.timeout || 0);

        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearAllTimers();
    };
  }, [clearAllTimers, newTimer, props]);

  return { isVisible, ref };
};
