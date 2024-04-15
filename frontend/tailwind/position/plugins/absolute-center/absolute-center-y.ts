import { PluginAPI } from "tailwindcss/types/config";
const root = "absolute-center-y";

export const absoluteCenterY = ({
  addUtilities,
  matchUtilities,
}: PluginAPI) => {
  addUtilities({
    [`.${root}`]: {
      top: "50%",
      transform: "translateY(-50%)",
    },
  });

  matchUtilities({
    [root]: (value) => ({
      top: `${value}%`,
      transform: `translateY(${-value}%)`,
    }),
  });
};
