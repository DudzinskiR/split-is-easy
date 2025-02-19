import { User } from "../user/User";
import { BillAdminData } from "./BillAdminData";
import { BillPayment } from "./BillPayment";
import { TransactionBetweenUsers } from "./TransactionBetweenUsers";
import { UserBalance } from "./UserBalance";

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
