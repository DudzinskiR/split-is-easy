import { currencyList } from "src/utils/const/currency-list";
import { CurrencyCode } from "./currency-code.type";

export const validCurrencyCode = (
  currencyCodeLike: string
): currencyCodeLike is CurrencyCode => {
  return (
    typeof currencyCodeLike === "string" &&
    !!currencyList.find((val) => val.code === currencyCodeLike)
  );
};
