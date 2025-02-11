import plugin from "tailwindcss/plugin";
import { PluginAPI } from "tailwindcss/types/config";

import { absoluteCenter } from "./plugins/absolute-center/absoluteCenter";
import { absoluteCenterX } from "./plugins/absolute-center/absoluteCenterX";
import { absoluteCenterY } from "./plugins/absolute-center/absoluteCenterY";

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
