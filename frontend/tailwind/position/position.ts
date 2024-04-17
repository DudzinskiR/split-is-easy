import plugin from "tailwindcss/plugin";
import { PluginAPI } from "tailwindcss/types/config";
import { absoluteCenter, absoluteCenterX, absoluteCenterY } from "./plugins";

const plugins: ((api: PluginAPI) => void)[] = [
  absoluteCenter,
  absoluteCenterX,
  absoluteCenterY,
];

export const position = plugin((api) => {
  for (const item of plugins) {
    item(api);
  }
});
