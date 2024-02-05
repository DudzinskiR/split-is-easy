import { HistoryBoxFilterState } from "../reducer/history-box-filter.reducer";

export const HistoryBoxReducerInitValues: HistoryBoxFilterState = {
  searchText: "",
  recipients: [],
  paidBy: [],
  users: [],
  minAmount: 0,
  maxAmount: 0,
};
