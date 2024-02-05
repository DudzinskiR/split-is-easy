import { SplitType } from "src/enums";
import { NewPaymentState } from "../interface/new-payment.interface";

export const newPaymentInitValues: NewPaymentState = {
  paymentTitle: "",
  amount: "",
  paidBy: "",
  participants: [],
  splitType: SplitType.EQUAL,
  values: {},
  currencyCode: "",
  billID: "",
};
