import { HistoryBoxFilterState } from "../reducer/HistoryBoxFilterReducer";

export const HistoryBoxReducerInitValues: HistoryBoxFilterState = {
  searchText: "",
  recipients: [],
  paidBy: [],
  users: [],
  minAmount: 0,
  maxAmount: 0,
};
