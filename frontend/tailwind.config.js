/** @type {import('tailwindcss').Config} */
import vitePluginRequire from "vite-plugin-require";
import { animation, transform } from "./tailwind";
import { position } from "./tailwind/position/position";
const defaultTheme = vitePluginRequire("tailwindcss/defaultTheme");

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "320px",
        "2xs": "480px",
        "2xl": "1408px",
        ...defaultTheme.screens,
      },
      colors: {
        slate: {
          150: "rgb(233,238,245)",
        },
      },
      maxWidth: {
        "8xl": "88rem",
        ...defaultTheme.maxWidth,
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
        "scroll-dot": {
          "0%": { opacity: 0, top: "5%" },
          "5%": { opacity: 1, top: "5%" },
          "15%": { opacity: 1, top: "5%" },
          "35%": { opacity: 1, top: "70%" },
          "45%": { opacity: 0, top: "70%" },
          "50%": { opacity: 0, top: "5%" },
          "100%": { opacity: 0, top: "5%" },
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
        "rotate-phone-15": {
          "0%": { transform: "rotateY(15deg)" },
          "50%": { transform: "rotateY(-15deg)" },
          "100%": { transform: "rotateY(15deg)" },
        },
        "rotate-phone-8": {
          "0%": { transform: "rotateY(8deg)" },
          "50%": { transform: "rotateY(-8deg)" },
          "100%": { transform: "rotateY(8deg)" },
        },
      },
      animation: {
        "custom-ping": "custom-ping 6s ease-in-out infinite",
        reveal: "reveal 1s ease-in-out",
        show: "show 1s ease-in-out",
        "scroll-dot": "scroll-dot 5s ease-in-out infinite",
        "chat-bubble-move-up-down":
          "chat-bubble-move-up-down 4s ease-in-out infinite",
        "chat-bubble-move-left-right":
          "chat-bubble-move-left-right 4s ease-in-out infinite",
        "rotate-phone-15": "rotate-phone-15 10s ease-in-out infinite",
        "rotate-phone-8": "rotate-phone-8 10s ease-in-out infinite",
      },
    },
  },
  plugins: [
    vitePluginRequire("@tailwindcss/forms"),
    animation,
    transform,
    position,
  ],
};
