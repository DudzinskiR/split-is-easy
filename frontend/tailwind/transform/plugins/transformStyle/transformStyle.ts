import { PluginAPI } from "tailwindcss/types/config";

const defaultValues = [
  "flat",
  "preserve-3d",
  "inherit",
  "initial",
  "revert",
  "revert-layer",
  "unset",
];

export const transformStyle = ({ addUtilities, e }: PluginAPI) => {
  const utilities = defaultValues.map((item) => ({
    [`.${e(`transform-style-${item}`)}`]: { transformStyle: `${item}` },
  }));

  addUtilities(utilities);
};
