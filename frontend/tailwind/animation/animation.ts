import plugin from "tailwindcss/plugin";
import { PluginAPI } from "tailwindcss/types/config";

import { animationDelay } from "./plugins/animationDelay/animationDelay";
import { animationDuration } from "./plugins/animationDuration/animationDuration";
import { animationFill } from "./plugins/animationFill/animationFill";

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
