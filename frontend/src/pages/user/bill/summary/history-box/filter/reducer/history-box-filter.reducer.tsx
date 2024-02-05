export interface HistoryBoxFilterState {
  searchText: string;
  recipients: string[];
  paidBy: string[];
  users: string[];
  minAmount: number;
  maxAmount: number;
}

type Action =
  | { type: "SEARCH"; payload: string }
  | { type: "RECIPIENT"; payload: string[] }
  | { type: "PAID_BY"; payload: string[] }
  | { type: "USERS"; payload: string[] }
  | { type: "MIN_AMOUNT"; payload: number }
  | { type: "MAX_AMOUNT"; payload: number }
  | { type: "INIT"; payload: string[] };
export const HistoryBoxFilterReducer = (
  state: HistoryBoxFilterState,
  action: Action
): HistoryBoxFilterState => {
  switch (action.type) {
    case "INIT":
      return {
        ...state,
        users: action.payload,
        paidBy: action.payload,
        recipients: action.payload,
      };
    case "SEARCH":
      return { ...state, searchText: action.payload };
    case "RECIPIENT":
      return { ...state, recipients: action.payload };
    case "PAID_BY":
      return { ...state, paidBy: action.payload };
    case "MIN_AMOUNT":
      return { ...state, minAmount: action.payload };
    case "MAX_AMOUNT":
      return { ...state, maxAmount: action.payload };
    case "USERS":
      return { ...state, users: action.payload };
    default:
      return { ...state };
  }
};
