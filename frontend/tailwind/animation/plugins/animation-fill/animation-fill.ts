import { PluginAPI } from "tailwindcss/types/config";

const defaultValues = [
  "backwards",
  "both",
  "forwards",
  "none",
  "inherit",
  "initial",
  "revert",
  "revert-layer",
  "unset",
];

export const animationFill = ({ addUtilities, e }: PluginAPI) => {
  const utilities = defaultValues.map((item) => ({
    [`.${e(`animation-fill-${item}`)}`]: { animationFillMode: `${item}` },
  }));

  addUtilities(utilities);
};
