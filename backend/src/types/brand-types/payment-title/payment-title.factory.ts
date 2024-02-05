import { ValidationExceptionFactory } from "src/exceptions";
import { validPaymentTitle } from "./payment-title-validator";
import { PaymentTitle } from "./payment-title.type";

export const createPaymentTitle = (paymentTitleLike: string) => {
  assertPaymentTitle(paymentTitleLike);

  return paymentTitleLike;
};

function assertPaymentTitle(
  paymentTitleLike: string
): asserts paymentTitleLike is PaymentTitle {
  if (!validPaymentTitle(paymentTitleLike)) {
    throw ValidationExceptionFactory.createInvalidValueException(
      `${paymentTitleLike} is not correct payment title`
    );
  }
}
