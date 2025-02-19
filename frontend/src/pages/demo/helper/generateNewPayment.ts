import { BillPayment } from "src/types/bill/BillPayment";
import { generatePaymentTitle } from "./generatePaymentTitle";

export const generateNewPayment = (
  id: string,
  from: string,
  to: string,
  amount: number
): BillPayment => {
  return {
    id: id,
    title: generatePaymentTitle(),
    amount: amount,
    paidBy: from,
    splitType: "EQUAL",
    billID: "",
    participants: [
      {
        userID: to,
        auto: false,
        value: amount,
        _id: "",
      },
    ],
    createdAt: new Date().toString(),
  };
};
