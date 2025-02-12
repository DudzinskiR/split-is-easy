import { Bill } from "src/types/bill/Bill";
import { BillAdminData } from "src/types/bill/BillAdminData";
import { BillPayment } from "src/types/bill/BillPayment";
import { TransactionBetweenUsers } from "src/types/bill/TransactionBetweenUsers";
import { UserBalance } from "src/types/bill/UserBalance";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { revertAll } from "../revertAll";

const initialState = {
  bills: {} as Record<string, Bill>,
};

initialState.bills["DEMO"] = {
  id: "DEMO",
  name: "DEMO",
  currency: "DOL",
  users: [],
  admins: [],
  admin: {
    invitationCode: "DEMO",
    requireAccept: false,
    requests: [],
  },
  payments: [],
  transaction: [],
  usersBalance: [],
};

export const billsSlice = createSlice({
  name: "BILLS",
  initialState: initialState,
  extraReducers: (builder) => builder.addCase(revertAll, () => initialState),
  reducers: {
    setBillData: (state, action: PayloadAction<Bill>) => {
      const bill = state.bills[action.payload.id];
      if (!bill) {
        state.bills[action.payload.id] = action.payload;
        state.bills[action.payload.id].payments = [];
      }
    },
    setBillAdminData: (
      state,
      action: PayloadAction<{ adminData: BillAdminData; billID: string }>
    ) => {
      const bill = state.bills[action.payload.billID];
      if (bill) {
        state.bills[action.payload.billID].admin = action.payload.adminData;
      }
    },
    setPayments: (
      state,
      action: PayloadAction<{ payments: BillPayment[]; id: string }>
    ) => {
      const bill = state.bills[action.payload.id];
      if (bill) {
        state.bills[action.payload.id].payments = action.payload.payments;
      }
    },
    setInvitationCode: (
      state,
      action: PayloadAction<{ invitationCode: string; billID: string }>
    ) => {
      const bill = state.bills[action.payload.billID];
      if (bill) {
        const newInviteConfig: BillAdminData = {
          ...bill.admin,
          invitationCode: action.payload.invitationCode,
        };

        bill.admin = newInviteConfig;
      }
    },
    setRequireAccept: (
      state,
      action: PayloadAction<{ require: boolean; billID: string }>
    ) => {
      const bill = state.bills[action.payload.billID];
      if (bill) {
        const newInviteConfig: BillAdminData = {
          ...bill.admin,
          requireAccept: action.payload.require,
        };

        bill.admin = newInviteConfig;
      }
    },
    newRequest: (
      state,
      action: PayloadAction<{ billID: string; userID: string; date: Date }>
    ) => {
      const bill = state.bills[action.payload.billID];
      if (bill) {
        bill.admin.requests.push({
          userID: action.payload.userID,
          date: action.payload.date,
        });
      }
    },
    acceptRequest: (
      state,
      action: PayloadAction<{ billID: string; userID: string }>
    ) => {
      const bill = state.bills[action.payload.billID];
      if (bill) {
        if (!bill.users.find((item) => item.id === action.payload.userID))
          bill.users.push({
            id: action.payload.userID,
            username: "",
            type: "NORMAL",
          });

        bill.admin.requests = bill.admin.requests.filter(
          (item) => item.userID !== action.payload.userID
        );
      }
      state.bills[action.payload.billID] = { ...bill };
    },
    rejectRequest: (
      state,
      action: PayloadAction<{ billID: string; userID: string }>
    ) => {
      const bill = state.bills[action.payload.billID];
      if (bill) {
        bill.admin.requests = bill.admin.requests.filter(
          (item) => item.userID !== action.payload.userID
        );
      }
      state.bills[action.payload.billID] = { ...bill };
    },
    addNewPayment: (state, action: PayloadAction<BillPayment>) => {
      const bill = state.bills[action.payload.billID];
      if (bill) {
        bill.payments = [action.payload, ...bill.payments];
        state.bills[action.payload.billID] = { ...bill };
      }
    },
    updateBillBalance: (
      state,
      action: PayloadAction<{
        transaction: TransactionBetweenUsers[];
        balance: UserBalance[];
        billID: string;
      }>
    ) => {
      const bill = state.bills[action.payload.billID];
      if (bill) {
        bill.usersBalance = action.payload.balance;
        bill.transaction = action.payload.transaction;
      }
    },
    addVirtualUser: (
      state,
      action: PayloadAction<{ billID: string; userID: string }>
    ) => {
      const bill = state.bills[action.payload.billID];
      if (bill && bill.users) {
        if (!bill.users.find((item) => item.id === action.payload.userID))
          bill.users.push({
            id: action.payload.userID,
            username: "",
            type: "VIRTUAL",
          });
      }
      state.bills[action.payload.billID] = { ...bill };
    },
    deleteUser: (
      state,
      action: PayloadAction<{ billID: string; userID: string }>
    ) => {
      const bill = state.bills[action.payload.billID];
      if (bill && bill.users) {
        bill.users = bill.users.filter(
          (item) => item.id !== action.payload.userID
        );
      }
      state.bills[action.payload.billID] = { ...bill };
    },
    setUserAsAdmin: (
      state,
      action: PayloadAction<{ billID: string; userID: string }>
    ) => {
      const bill = state.bills[action.payload.billID];
      if (bill) {
        if (!bill.admins.includes(action.payload.userID)) {
          bill.admins.push(action.payload.userID);
          const user = bill.users.find(
            (item) => item.id === action.payload.userID
          );
          if (user) user.type = "ADMIN";
        }
      }
      state.bills[action.payload.billID] = { ...bill };
    },
    setUserAsUser: (
      state,
      action: PayloadAction<{ billID: string; userID: string }>
    ) => {
      const bill = state.bills[action.payload.billID];
      if (bill) {
        bill.admins = bill.admins.filter(
          (item) => item !== action.payload.userID
        );
        const user = bill.users.find(
          (item) => item.id === action.payload.userID
        );
        if (user) user.type = "NORMAL";
      }

      state.bills[action.payload.billID] = { ...bill };
    },
    updateBillName: (
      state,
      action: PayloadAction<{ billID: string; billName: string }>
    ) => {
      const bill = state.bills[action.payload.billID];
      if (!bill) return;

      bill.name = action.payload.billName;
    },
  },
});

export const {
  setBillData,
  setPayments,
  setInvitationCode,
  setBillAdminData,
  setRequireAccept,
  acceptRequest,
  rejectRequest,
  newRequest,
  addNewPayment,
  updateBillBalance,
  addVirtualUser,
  deleteUser,
  setUserAsAdmin,
  setUserAsUser,
  updateBillName,
} = billsSlice.actions;
