import { SplitType } from "src/enums/SplitType/SplitType";
import { UserSplitInfo } from "src/types/user/UserSplitInfo";

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
