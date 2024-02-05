import { PaymentTitle } from "./payment-title.type";

export const validPaymentTitle = (
  paymentTitleLike: string
): paymentTitleLike is PaymentTitle => {
  return typeof paymentTitleLike === "string";
};
