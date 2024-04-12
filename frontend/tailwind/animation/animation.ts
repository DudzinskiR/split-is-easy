import plugin from "tailwindcss/plugin";
import { animationDelay, animationDuration, animationFill } from "./plugins";
import { PluginAPI } from "tailwindcss/types/config";

const plugins: ((api: PluginAPI) => void)[] = [
  animationDelay,
  animationDuration,
  animationFill,
];

export const animation = plugin((api) => {
  for (const item of plugins) {
    item(api);
  }
});
