import {
  User,
  BillAdminData,
  BillPayment,
  TransactionBetweenUsers,
  UserBalance,
} from "src/types";

export type Bill = {
  id: string;
  currency: string;
  users: User[];
  admins: string[];
  admin: BillAdminData;
  payments: BillPayment[];
  usersBalance: UserBalance[];
  transaction: TransactionBetweenUsers[];
  name: string;
};
