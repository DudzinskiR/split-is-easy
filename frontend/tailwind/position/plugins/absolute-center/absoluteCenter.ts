import { PluginAPI } from "tailwindcss/types/config";

const root = "absolute-center";

export const absoluteCenter = ({ addUtilities, matchUtilities }: PluginAPI) => {
  addUtilities({
    [`.${root}`]: {
      left: "50%",
      top: "50%",
      transform: "translateX(-50%) translateY(-50%)",
    },
  });

  matchUtilities({
    [root]: (value) => {
      const [valX, valY] = value.split(" ");

      return {
        left: `${valX}%`,
        top: `${valY}%`,
        transform: `translateX(${-valX}%) translateY(${-valY})`,
      };
    },
  });
};
