import { Types } from "mongoose";
import { SplitType } from "src/enums";
import { MongoDocument } from "src/interfaces/document";
import { CurrencyCode, PaymentParticipants } from "src/types";

export interface PaymentDocument extends MongoDocument {
  title: string;
  amount: number;
  paidBy: Types.ObjectId;
  participants: PaymentParticipants[];
  splitType: SplitType;
  currency: CurrencyCode;
  billID: Types.ObjectId;
  isHidden?: boolean;
}
