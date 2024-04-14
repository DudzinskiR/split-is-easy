import plugin from "tailwindcss/plugin";
// import { animationDelay, animationDuration, animationFill } from "./plugins";
import { PluginAPI } from "tailwindcss/types/config";
import { transformStyle, transformString } from "./plugins";

const plugins: ((api: PluginAPI) => void)[] = [transformStyle, transformString];

export const transform = plugin((api) => {
  for (const item of plugins) {
    item(api);
  }
});
