export type InvitationStatus = { billName: string; billID: string } & (
  | JoinedStatus
  | PendingApprovalStatus
  | RequestPossibleStatus
  | JoinPossibleStatus
);

type JoinedStatus = {
  status: "JOINED";
};

type PendingApprovalStatus = {
  status: "PENDING_APPROVAL";
};

type RequestPossibleStatus = {
  status: "REQUEST_POSSIBLE";
};

type JoinPossibleStatus = {
  status: "JOIN_POSSIBLE";
};
