import { ValidationExceptionFactory } from "src/exceptions";
import { PaymentAmount } from "./payment-amount.type";
import { validPaymentAmount } from "./payment-amount.validator";

export const createPaymentAmount = (paymentAmountLike: number) => {
  assertPaymentAmount(paymentAmountLike);

  return paymentAmountLike;
};

function assertPaymentAmount(
  paymentAmountLike: number
): asserts paymentAmountLike is PaymentAmount {
  if (!validPaymentAmount(paymentAmountLike)) {
    throw ValidationExceptionFactory.createInvalidValueException(
      `${paymentAmountLike} is not correct payment amount`
    );
  }
}
