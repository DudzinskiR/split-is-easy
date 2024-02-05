import { SplitType } from "src/enums";
import { UserSplitInfo } from "src/types";

export interface NewPaymentState {
  paymentTitle: string;
  amount: string;
  paidBy: string | undefined;
  participants: string[];
  splitType: SplitType;
  values: UserSplitInfo;
  currencyCode: string;
  billID: string;
}
