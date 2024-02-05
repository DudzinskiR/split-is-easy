import { BillRequest } from "src/types";

export type BillAdminData = {
  invitationCode: string;
  requireAccept: boolean;
  requests: BillRequest[];
};
