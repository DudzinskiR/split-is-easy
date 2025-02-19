import { useContext } from "react";
import { DropdownContext } from "../context/DropdownContext";

export const useDropdownContext = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error(
      "useDropdownContext must by used within a DropdownContextProvider"
    );
  }

  return context;
};
