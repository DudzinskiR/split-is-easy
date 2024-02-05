import { SplitType } from "src/enums";

export type BillPayment = {
  id: string;
  title: string;
  amount: number;
  paidBy: string;
  splitType: SplitType;
  billID: string;
  participants: PaymentParticipants[];
  createdAt: string;
};

export type PaymentParticipants = {
  userID: string;
  auto: boolean;
  value: number;
  _id: string;
};
