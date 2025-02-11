import { PluginAPI } from "tailwindcss/types/config";

const defaultValues = {
  zero: "translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)",
};

export const transformString = ({
  addUtilities,
  matchUtilities,
  theme,
  e,
}: PluginAPI) => {
  const utilities = Object.entries(defaultValues).map(([key, value]) => {
    return {
      [`.${e(`transform3D-${key}`)}`]: { transform: `${value}` },
    };
  });

  addUtilities(utilities);
  matchUtilities(
    {
      transform3D: (value) => {
        const newValue = value.replace(/_/g, " ");

        return {
          transform: newValue,
        };
      },
    },
    { values: theme("transform") }
  );
};
