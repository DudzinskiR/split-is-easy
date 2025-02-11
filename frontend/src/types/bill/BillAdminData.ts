import { BillRequest } from "./BillRequest";

export type BillAdminData = {
  invitationCode: string;
  requireAccept: boolean;
  requests: BillRequest[];
};
