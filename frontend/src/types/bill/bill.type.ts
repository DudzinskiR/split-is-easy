import { User } from "../user/user.type";
import { BillAdminData } from "./bill-admin-data.type";
import { BillPayment } from "./bill-payment.type";
import { TransactionBetweenUsers } from "./transaction-between-users.type";
import { UserBalance } from "./user-balance.type";

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
