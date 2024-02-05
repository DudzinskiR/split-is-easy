//GlobalFlag
import { ReactNode, createContext, useRef } from "react";

export interface GlobalFlagProps {
  flags: Record<string, string>;
  setFlag: (name: string, value: string) => void;
  getFlag: (name: string) => string | undefined;
  deleteFlag: (name: string) => void;
  clearAllFlags: () => void;
}

export const GlobalFlagContext = createContext<GlobalFlagProps | undefined>(
  undefined
);

interface GlobalFlagProviderProps {
  children: ReactNode;
}

export const GlobalFlagContextProvider = ({
  children,
}: GlobalFlagProviderProps) => {
  const flags = useRef<Record<string, string>>({});

  const setFlag = (name: string, value: string) => {
    flags.current[name] = value;
  };

  const getFlag = (name: string | undefined) => {
    if (name === undefined) return undefined;
    if (flags.current[name]) {
      return flags.current[name];
    } else {
      return undefined;
    }
  };

  const deleteFlag = (name: string) => {
    delete flags.current[name];
  };

  const clearAllFlags = () => {
    flags.current = {};
  };

  return (
    <GlobalFlagContext.Provider
      value={{
        flags: flags.current,
        setFlag,
        getFlag,
        deleteFlag,
        clearAllFlags,
      }}
    >
      {children}
    </GlobalFlagContext.Provider>
  );
};
