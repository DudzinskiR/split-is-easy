import { useEffect } from "react";
import {
  KeyboardInputCode,
  KeyboardInputCodeName,
} from "src/types/keyboardKey/keyboardKey";

export interface KeyDownInfo {
  key: KeyboardTypes;
  callback: (param: unknown) => void;
  param?: Record<string, unknown>;
}

type KeyboardTypes =
  | KeyboardInputCodeName
  | KeyboardInputCode
  | KeyboardInputCodeName[]
  | KeyboardInputCode[];

export const useKeyDown = (keyDown: KeyDownInfo | KeyDownInfo[]) => {
  const getKeyDownInfo = (keyDownInfo: KeyDownInfo, input: string) => {
    if (Array.isArray(keyDownInfo.key)) {
      const key = keyDownInfo.key.find((item) => item === input);
      if (key) {
        return keyDownInfo;
      }
    } else {
      if (keyDownInfo.key === input) return keyDownInfo;
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (Array.isArray(keyDown)) {
        for (const item of keyDown) {
          const keyDownInfo = getKeyDownInfo(item, event.key);
          if (keyDownInfo) {
            keyDownInfo.callback(keyDownInfo.param);
            break;
          }
        }
      } else {
        const keyDownInfo = getKeyDownInfo(keyDown, event.key);
        if (keyDownInfo) keyDownInfo.callback(keyDownInfo.param);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [keyDown]);
};
