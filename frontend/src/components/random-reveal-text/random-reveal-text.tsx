import { useEffect, useState } from "react";
import { CharToReveal } from "./types";

interface RandomRevealTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export const RandomRevealText = ({
  text,
  className,
  delay = 0,
}: RandomRevealTextProps) => {
  const [characters, setCharacters] = useState<CharToReveal[]>([]);
  useEffect(() => {
    const char = text.split("");
    setCharacters(
      char.map<CharToReveal>((item) => ({
        char: item,
        delay: Math.random(),
        posY: Math.random(),
        duration: Math.random(),
      }))
    );
  }, [text]);

  return (
    <div className={className}>
      {characters.map((item, index) => (
        <span
          key={index}
          className="relative animate-reveal opacity-0 w-full"
          style={{
            top: item.posY * 100 - 50,
            animationDelay: `${item.delay * 2 + delay}s`,
            animationDuration: `${item.duration * 2 + 1}s`,
            animationFillMode: "forwards",
          }}
        >
          {item.char}
        </span>
      ))}
    </div>
  );
};
