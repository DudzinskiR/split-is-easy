import { ValidationExceptionFactory } from "src/exceptions";
import { CurrencyCode } from "./currency-code.type";
import { validCurrencyCode } from "./currency-code.validator";

export const createCurrencyCode = (currencyCodeLike: string) => {
  assertCurrencyCode(currencyCodeLike);

  return currencyCodeLike;
};

function assertCurrencyCode(
  currencyCodeLike: string
): asserts currencyCodeLike is CurrencyCode {
  if (!validCurrencyCode(currencyCodeLike)) {
    throw ValidationExceptionFactory.createInvalidValueException(
      `${currencyCodeLike} is not correct currency`
    );
  }
}
