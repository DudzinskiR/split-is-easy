import { useContext } from "react";

import { NewPaymentContext } from "../context/NewPaymentContext";

export const useNewPaymentContext = () => {
  const context = useContext(NewPaymentContext);
  if (!context) {
    throw new Error(
      "useNewPaymentContext must by used within a NewPaymentContextProvider"
    );
  }

  return context;
};
