import plugin from "tailwindcss/plugin";

const defaultValues = {
  none: "0s",
  100: "100ms",
  200: "200ms",
  300: "300ms",
  400: "400ms",
  500: "500ms",
  1000: "1000ms",
  1500: "1500ms",
  2000: "2000ms",
  3000: "3000ms",
  4000: "4000ms",
  5000: "5000ms",
};

export const animationDelay = plugin(
  ({ addUtilities, matchUtilities, theme, e }) => {
    const utilities = Object.entries(defaultValues).map(([key, value]) => ({
      [`.${e(`animation-delay-${key}`)}`]: { animationDelay: `${value}` },
    }));

    addUtilities(utilities);

    matchUtilities(
      {
        "animation-delay": (value) => ({
          animationDelay: value,
        }),
      },
      { values: theme("animationDelay") }
    );
  }
);
