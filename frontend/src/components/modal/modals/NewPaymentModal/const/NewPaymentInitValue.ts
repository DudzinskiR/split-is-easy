import { SplitType } from "src/enums/SplitType/SplitType";

import { NewPaymentState } from "../interface/NewPaymentState";

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
