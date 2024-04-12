import plugin from "tailwindcss/plugin";

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

export const animationFill = plugin(({ addUtilities, e }) => {
  const utilities = defaultValues.map((item) => ({
    [`.${e(`animation-fill-${item}`)}`]: { animationFillMode: `${item}` },
  }));

  addUtilities(utilities);
});
