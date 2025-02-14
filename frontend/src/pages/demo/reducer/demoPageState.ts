import { Bill } from "src/types/bill/Bill";
import { Currency } from "src/types/currency/Currency";

export type DemoPageStates = {
  username: Record<string, string>;
  currency: Currency;
  bill: Bill;
};
