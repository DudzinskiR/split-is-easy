import { Types } from "mongoose";

export type PaymentParticipants = {
  userID: Types.ObjectId;
  auto: boolean;
  value: number;
};
