import { useContext } from "react";
import { NewPaymentContext } from "../context/new-payment.context";

export const useNewPaymentContext = () => {
  const context = useContext(NewPaymentContext);
  if (!context) {
    throw new Error(
      "useNewPaymentContext must by used within a NewPaymentContextProvider"
    );
  }

  return context;
};
