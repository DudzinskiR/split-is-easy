import { Vector2 } from "src/utils/math";

interface PingProps {
  position: Vector2;
  size: number;
  number: number;
  delay: number;
  background: string;
}

export const Ping = ({
  position,
  size,
  background,
  number,
  delay,
}: PingProps) => {
  return (
    <div>
      {Array.from({ length: number }).map((_, index) => {
        return (
          <div
            key={index}
            className="absolute w-[300px] h-[300px] bg-indigo-500/25 rounded-full animate-custom-ping opacity-0 shadow pointer-events-none"
            style={{
              width: size,
              height: size,
              background: background,
              top: position.y,
              left: position.x,
              animationDelay: `${delay * index}ms`,
              animationDuration: `${(number * delay) / 1000}s`,
            }}
          ></div>
        );
      })}
    </div>
  );
};
