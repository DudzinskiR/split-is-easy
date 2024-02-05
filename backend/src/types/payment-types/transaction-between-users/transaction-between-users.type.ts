import { Types } from "mongoose";

export type TransactionBetweenUsers = {
  fromUserID: Types.ObjectId;
  toUserID: Types.ObjectId;
  amount: number;
};
