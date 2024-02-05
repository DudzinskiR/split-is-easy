import { Types } from "mongoose";
import { MongoDocument } from "src/interfaces/document";
import {
  BillName,
  CurrencyCode,
  Invitation,
  InvitationConfig,
  TransactionBetweenUsers,
  UserBalance,
  VirtualUser,
} from "src/types";

export interface BillDocument extends MongoDocument {
  name: BillName;
  currency: CurrencyCode;
  users: Types.ObjectId[];
  virtualUsers: VirtualUser[];
  admins: Types.ObjectId[];
  createdBy: Types.ObjectId;
  invitationConfig: InvitationConfig;
  requests: Invitation[];
  payments: Types.ObjectId[];
  usersBalance: UserBalance[];
  transaction: TransactionBetweenUsers[];
}
