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
    },
  },
  plugins: [vitePluginRequire("@tailwindcss/forms")],
};
