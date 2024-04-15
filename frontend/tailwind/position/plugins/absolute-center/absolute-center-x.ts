import { PluginAPI } from "tailwindcss/types/config";
const root = "absolute-center-x";

export const absoluteCenterX = ({
  addUtilities,
  matchUtilities,
}: PluginAPI) => {
  addUtilities({
    [`.${root}`]: {
      left: "50%",
      transform: "translateX(-50%)",
    },
  });

  matchUtilities({
    [root]: (value) => ({
      left: `${value}%`,
      transform: `translateX(${-value}%)`,
    }),
  });
};
