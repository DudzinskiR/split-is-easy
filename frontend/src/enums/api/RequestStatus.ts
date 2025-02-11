export const RequestStatus = {
  IDLE: "IDLE",
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
} as const;

export type RequestStatus = (typeof RequestStatus)[keyof typeof RequestStatus];
