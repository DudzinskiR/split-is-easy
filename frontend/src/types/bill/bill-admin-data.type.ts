import { BillRequest } from "./bill-request.type";

export type BillAdminData = {
  invitationCode: string;
  requireAccept: boolean;
  requests: BillRequest[];
};
