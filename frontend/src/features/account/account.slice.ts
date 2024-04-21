import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { FirebaseProviderID, UserStatus } from "src/enums";
import { AccountBill, AccountRequest, UserBalance } from "src/types";
import { revertAll } from "src/features";

const initialState = {
  userID: "-1",
  providerID: FirebaseProviderID.UNKNOWN as FirebaseProviderID,
  userStatus: UserStatus.UNKNOWN as UserStatus,
  bills: null as AccountBill[] | null,
  requests: null as AccountRequest[] | null,
};

export const accountSlice = createSlice({
  name: "ACCOUNT",
  extraReducers: (builder) => builder.addCase(revertAll, () => initialState),
  initialState: initialState,
  reducers: {
    setProviderID: (state, action: PayloadAction<FirebaseProviderID>) => {
      state.providerID = action.payload;
    },
    setAccountStatus: (state, action: PayloadAction<UserStatus>) => {
      state.userStatus = action.payload;
    },
    setAccountID: (state, action: PayloadAction<string>) => {
      state.userID = action.payload;
    },
    setAccountData: (state, action: PayloadAction<{ userID: string }>) => {
      state.userID = action.payload.userID;
    },
    setAccountBill: (state, action: PayloadAction<AccountBill[]>) => {
      state.bills = action.payload;
    },
    setRequestList: (state, action: PayloadAction<AccountRequest[]>) => {
      state.requests = action.payload;
    },
    cancelRequest: (state, action: PayloadAction<{ billID: string }>) => {
      if (state.requests)
        state.requests = state.requests.filter(
          (item) => item.billID !== action.payload.billID
        );
    },
    acceptAccountRequest: (
      state,
      action: PayloadAction<{
        billID: string;
        name: string;
        userCount: number;
        currency: string;
      }>
    ) => {
      if (state.requests) {
        state.requests = state.requests.filter(
          (item) => item.billID !== action.payload.billID
        );
      }

      state.bills?.push({
        billID: action.payload.billID,
        name: action.payload.name,
        balance: 0,
        currencyCode: action.payload.currency,
        userCount: action.payload.userCount,
      });
    },
    addBill: (
      state,
      action: PayloadAction<{
        billID: string;
        billName: string;
        currency: string;
      }>
    ) => {
      state.bills?.push({
        billID: action.payload.billID,
        name: action.payload.billName,
        balance: 0,
        currencyCode: action.payload.currency,
        userCount: 1,
      });
    },
    addRequest: (
      state,
      action: PayloadAction<{ billID: string; billName: string }>
    ) => {
      if (state.requests)
        state.requests.push({
          billID: action.payload.billID,
          billName: action.payload.billName,
        });
    },
    updateAccountBalance: (
      state,
      action: PayloadAction<{ billID: string; balance: UserBalance[] }>
    ) => {
      const bill = state.bills?.find(
        (item) => item.billID === action.payload.billID
      );
      if (!bill) return;
      const userBalance =
        action.payload.balance.find((item) => item.userID === state.userID)
          ?.value || 0;

      bill.balance = userBalance;
    },
    updateBillNameInAccount: (
      state,
      action: PayloadAction<{ billID: string; billName: string }>
    ) => {
      const bill = state.bills?.find(
        (item) => item.billID === action.payload.billID
      );
      if (!bill) return;

      bill.name = action.payload.billName;
    },
    updateUserCountInBill: (
      state,
      action: PayloadAction<{ billID: string; userCount: number }>
    ) => {
      const bill = state.bills?.find(
        (item) => item.billID === action.payload.billID
      );
      if (!bill) return;
      bill.userCount = action.payload.userCount;
    },
  },
});

export const {
  setProviderID,
  setAccountStatus,
  setAccountID,
  setAccountData,
  setAccountBill,
  setRequestList,
  cancelRequest,
  acceptAccountRequest,
  addRequest,
  addBill,
  updateAccountBalance,
  updateBillNameInAccount,
  updateUserCountInBill,
} = accountSlice.actions;
