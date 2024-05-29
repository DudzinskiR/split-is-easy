import { SplitType } from "src/enums/split-type/split-type";
import { UserSplitInfo } from "src/types/user/user-split-info.type";

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
