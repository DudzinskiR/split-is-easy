import plugin from "tailwindcss/plugin";
import { PluginAPI } from "tailwindcss/types/config";

import { perspective } from "./plugins/perspective/perspective";
import { transformString } from "./plugins/transformString/transformString";
import { transformStyle } from "./plugins/transformStyle/transformStyle";

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
