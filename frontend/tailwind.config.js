/** @type {import('tailwindcss').Config} */
import vitePluginRequire from "vite-plugin-require";
import { animationDelay, animationFill } from "./tailwind";
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
        reveal: {
          "20%": { opacity: 0 },
          "100%": { opacity: 1, top: 0 },
        },
        show: {
          "0%": { transform: "scale(0.01)" },
          "100%": { transform: "scale(0.99)" },
        },
        "chat-bubble-move-up-down": {
          "0%": { transform: `translateY(5px)` },
          "50%": { transform: `translateY(-5px)` },
          "100%": { transform: `translateY(5px)` },
        },
        "chat-bubble-move-left-right": {
          "0%": { transform: `translateX(5px)` },
          "50%": { transform: `translateX(-5px)` },
          "100%": { transform: `translateX(5px)` },
        },
      },
      animation: {
        "custom-ping": "custom-ping 6s ease-in-out infinite",
        reveal: "reveal 1s ease-in-out",
        show: "show 1s ease-in-out",
        "chat-bubble-move-up-down":
          "chat-bubble-move-up-down 4s ease-in-out infinite",
        "chat-bubble-move-left-right":
          "chat-bubble-move-left-right 4s ease-in-out infinite",
      },
    },
  },
  plugins: [
    vitePluginRequire("@tailwindcss/forms"),
    animationDelay,
    animationFill,
  ],
};
