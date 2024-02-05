import { PaymentAmount } from "./payment-amount.type";

export const validPaymentAmount = (
  PaymentAmountLike: number
): PaymentAmountLike is PaymentAmount => {
  return typeof PaymentAmountLike === "number" && PaymentAmountLike >= 0;
};
