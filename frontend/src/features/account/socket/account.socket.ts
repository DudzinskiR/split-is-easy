import { useDispatch } from "react-redux";
import { SocketData, UserBalance } from "src/types";
import {
  acceptAccountRequest,
  addBill,
  addRequest,
  cancelRequest,
  updateAccountBalance,
  updateBillNameInAccount,
  updateUserCountInBill,
} from "../account.slice";

export const useAccountSocket = () => {
  const dispatch = useDispatch();
  const globalAccountSockets: SocketData[] = [
    {
      name: "ACCOUNT/BILL/NEW",
      listener: (payload: {
        billName: string;
        billID: string;
        currency: string;
      }) => {
        dispatch(
          addBill({
            billID: payload.billID,
            billName: payload.billName,
            currency: payload.currency,
          })
        );
      },
    },
    {
      name: "ACCOUNT/REQUEST/NEW",
      listener: (payload: { billName: string; billID: string }) => {
        dispatch(
          addRequest({ billID: payload.billID, billName: payload.billName })
        );
      },
    },
    {
      name: "ACCOUNT/REQUEST/CANCEL",
      listener: (payload: { billID: string }) => {
        dispatch(cancelRequest({ billID: payload.billID }));
      },
    },
    {
      name: "ACCOUNT/REQUEST/ACCEPT",
      listener: (payload: {
        billID: string;
        name: string;
        userCount: number;
        currency: string;
      }) => {
        dispatch(
          acceptAccountRequest({
            billID: payload.billID,
            name: payload.name,
            userCount: payload.userCount,
            currency: payload.currency,
          })
        );
      },
    },
    {
      name: "BILL/ID/BALANCE",
      listener: (payload: { balance: UserBalance[]; billID: string }) => {
        dispatch(
          updateAccountBalance({
            billID: payload.billID,
            balance: payload.balance,
          })
        );
      },
    },
    {
      name: "BILL/ID/NAME",
      listener: (payload: { billID: string; billName: string }) => {
        dispatch(
          updateBillNameInAccount({
            billID: payload.billID,
            billName: payload.billName,
          })
        );
      },
    },
    {
      name: "BILL/ID/USER_COUNT",
      listener: (payload: { billID: string; userCount: number }) => {
        dispatch(
          updateUserCountInBill({
            billID: payload.billID,
            userCount: payload.userCount,
          })
        );
      },
    },
  ];

  return { globalAccountSockets };
};
