/** @type {import('tailwindcss').Config} */
import vitePluginRequire from "vite-plugin-require";

const defaultTheme = vitePluginRequire("tailwindcss/defaultTheme");

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "320px",
        ...defaultTheme.screens,
      },
      colors: {
        slate: {
          150: "rgb(233,238,245)",
        },
      },
      keyframes: {
        "custom-ping": {
          "0%": { opacity: 0, transform: "scale(0)" },
          "10%": { opacity: 1 },
          "100%": { opacity: 0, transform: "scale(1)" },
        },
      },
      animation: {
        "custom-ping": "custom-ping 6s ease-in-out infinite",
      },
    },
  },
  plugins: [vitePluginRequire("@tailwindcss/forms")],
};
