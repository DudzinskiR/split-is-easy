import { useContext } from "react";
import { DemoPageContext } from "../context/DemoPageContext";

export const useDemoPageContext = () => {
  const context = useContext(DemoPageContext);
  if (!context) {
    throw new Error("useDemoPageContext must by used within a DemoPageContext");
  }

  return context;
};
