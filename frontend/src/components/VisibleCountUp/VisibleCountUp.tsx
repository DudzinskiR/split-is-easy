import { useEffect, useRef, useState } from "react";

interface VisibleCountUpProps {
  value: number;
  finalValue?: string | number;
  time?: number;
  timeStep?: number;
}

export const VisibleCountUp = ({
  value,
  finalValue,
  time = 2000,
  timeStep = 33,
}: VisibleCountUpProps) => {
  const [count, setCount] = useState(value);
  const [status, setStatus] = useState<"IDLE" | "COUNTING" | "FINISH">("IDLE");
  const countRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (countRef.current) {
        const top = countRef.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (top < windowHeight) {
          window.removeEventListener("scroll", handleScroll);
          setStatus("COUNTING");
          setCount(0);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [value, time]);

  useEffect(() => {
    if (!status) return;
    const step = value / (time / timeStep);
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev < value) {
          return prev + step;
        } else {
          setStatus("FINISH");
          clearInterval(interval);
          return value;
        }
      });
    }, timeStep);

    return () => clearInterval(interval);
  }, [status, time, timeStep, value]);

  const renderValue = () => {
    if (status === "FINISH" && finalValue) return finalValue;

    return Math.round(count);
  };

  return <div ref={countRef}>{renderValue()}</div>;
};
