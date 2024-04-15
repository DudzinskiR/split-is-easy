import { PluginAPI } from "tailwindcss/types/config";

const defaultValues = [0, 500, 1000, 1500, 2000];

export const perspective = ({
  addUtilities,
  matchUtilities,
  theme,
  e,
}: PluginAPI) => {
  const utilities = defaultValues.map((value) => ({
    [`.${e(`perspective-${value}`)}`]: { perspective: `${value}px` },
  }));

  addUtilities(utilities);

  matchUtilities(
    {
      perspective: (value) => ({
        perspective: value,
      }),
    },
    { values: theme("perspective") }
  );
};
