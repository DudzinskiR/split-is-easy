import { useContext } from "react";
import { GlobalFlagContext } from "src/contexts";

export const useGlobalFlagContext = () => {
  const context = useContext(GlobalFlagContext);
  if (!context) {
    throw new Error(
      "useGlobalFlagContext must by used within a GlobalFlagContextProvider"
    );
  }

  return context;
};
