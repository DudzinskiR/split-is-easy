import { useContext } from "react";
import { DropdownContext } from "../context/dropdown.context";

export const useDropdownContext = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error(
      "useDropdownContext must by used within a DropdownContextProvider"
    );
  }

  return context;
};
