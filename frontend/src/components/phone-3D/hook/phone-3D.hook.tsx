import { useContext } from "react";
import { Phone3DContext } from "../context/phone-3D.context";

export const usePhone3DContext = () => {
  const context = useContext(Phone3DContext);
  if (!context) {
    throw new Error(
      "usePhone3DContext must by used within a Phone3DContextProvider"
    );
  }

  return context;
};
