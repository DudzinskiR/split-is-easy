import plugin from "tailwindcss/plugin";
import { PluginAPI } from "tailwindcss/types/config";
import { transformStyle, transformString, perspective } from "./plugins";

const plugins: ((api: PluginAPI) => void)[] = [
  transformStyle,
  transformString,
  perspective,
];

export const transform = plugin((api) => {
  for (const item of plugins) {
    item(api);
  }
});
