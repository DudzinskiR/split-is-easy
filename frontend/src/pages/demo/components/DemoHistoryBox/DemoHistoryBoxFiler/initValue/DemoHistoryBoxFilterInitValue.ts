import { HistoryBoxFilterState } from "src/pages/user/bill/summary/HistoryBox/filter/reducer/HistoryBoxFilterReducer";

export const DemoHistoryBoxReducerInitValues: HistoryBoxFilterState = {
  searchText: "",
  recipients: [],
  paidBy: [],
  users: [],
  minAmount: 0,
  maxAmount: 0,
};
