import { useDispatch } from "react-redux";
import { BillPayment } from "src/types/bill/bill-payment.type";
import { TransactionBetweenUsers } from "src/types/bill/transaction-between-users.type";
import { UserBalance } from "src/types/bill/user-balance.type";
import { SocketData } from "src/types/socket/socket-data.type";

import {
  acceptRequest,
  addNewPayment,
  addVirtualUser,
  deleteUser,
  newRequest,
  rejectRequest,
  setInvitationCode,
  setRequireAccept,
  setUserAsAdmin,
  setUserAsUser,
  updateBillBalance,
  updateBillName,
} from "../bill.slice";

export const useBillSocket = () => {
  const dispatch = useDispatch();
  const globalBillListener: SocketData[] = [
    {
      name: "BILL/ID/NEW_INV_CODE",
      listener: (payload: { invitationCode: string; billID: string }) => {
        dispatch(
          setInvitationCode({
            invitationCode: payload.invitationCode,
            billID: payload.billID,
          })
        );
      },
    },
    {
      name: "BILL/ID/REQUIRE",
      listener: (payload: { require: boolean; billID: string }) => {
        dispatch(
          setRequireAccept({
            require: payload.require,
            billID: payload.billID,
          })
        );
      },
    },
    {
      name: "BILL/ID/REQUEST/NEW",
      listener: (payload: { userID: string; billID: string; date: Date }) => {
        dispatch(
          newRequest({
            userID: payload.userID,
            billID: payload.billID,
            date: payload.date,
          })
        );
      },
    },
    {
      name: "BILL/ID/REQUEST/ACCEPT",
      listener: (payload: { billID: string; userID: string }) => {
        dispatch(
          acceptRequest({ billID: payload.billID, userID: payload.userID })
        );
      },
    },
    {
      name: "BILL/ID/REQUEST/REJECT",
      listener: (payload: { billID: string; userID: string }) => {
        dispatch(
          rejectRequest({ billID: payload.billID, userID: payload.userID })
        );
      },
    },
    {
      name: "BILL/ID/PAYMENT/NEW",
      listener: (payload: BillPayment) => {
        dispatch(addNewPayment(payload));
      },
    },
    {
      name: "BILL/ID/BALANCE",
      listener: (payload: {
        transaction: TransactionBetweenUsers[];
        balance: UserBalance[];
        billID: string;
      }) => {
        dispatch(
          updateBillBalance({
            transaction: payload.transaction,
            balance: payload.balance,
            billID: payload.billID,
          })
        );
      },
    },
    {
      name: "BILL/ID/VIRTUAL_USER/NEW",
      listener: (payload: { billID: string; userID: string }) => {
        dispatch(
          addVirtualUser({ billID: payload.billID, userID: payload.userID })
        );
      },
    },
    {
      name: "BILL/ID/USER/DELETE",
      listener: (payload: { billID: string; userID: string }) => {
        dispatch(
          deleteUser({ billID: payload.billID, userID: payload.userID })
        );
      },
    },
    {
      name: "BILL/ID/USER/ADMIN",
      listener: (payload: { billID: string; userID: string }) => {
        dispatch(
          setUserAsAdmin({ billID: payload.billID, userID: payload.userID })
        );
      },
    },
    {
      name: "BILL/ID/USER/NORMAL",
      listener: (payload: { billID: string; userID: string }) => {
        dispatch(
          setUserAsUser({ billID: payload.billID, userID: payload.userID })
        );
      },
    },
    {
      name: "BILL/ID/NAME",
      listener: (payload: { billID: string; billName: string }) => {
        dispatch(
          updateBillName({ billID: payload.billID, billName: payload.billName })
        );
      },
    },
  ];

  return { globalBillListener };
};
