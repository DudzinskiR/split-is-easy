export type RequestStatus =
  | (RequestData &
      (
        | JoinedStatus
        | PendingApprovalStatus
        | RequestPossibleStatus
        | JoinPossibleStatus
      ))
  | IdleStatus;

type RequestData = {
  billName: string;
  billID: string;
};

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

type IdleStatus = {
  status: "IDLE";
};
