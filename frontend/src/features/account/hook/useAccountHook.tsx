import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/features/store";
import { useGlobalFlagContext } from "src/hooks/useGlobalFlagContext/useGlobalFlagContext";
import { API } from "src/utils/api/api";

import {
  setAccountBill,
  setAccountData,
  setRequestList,
} from "../accountSlice";
import { AccountBill } from "src/types/account/AccountBill";
import { AccountRequest } from "src/types/account/AccountRequest";

export const useAccountHook = () => {
  const dispatch = useDispatch();
  const accountID = useSelector((state: RootState) => state.account.userID);
  const bills = useSelector((state: RootState) => state.account.bills);
  const requests = useSelector((state: RootState) => state.account.requests);
  const { setFlag, getFlag } = useGlobalFlagContext();

  const getAccountID = () => {
    const fetchAccountID = async () => {
      setFlag("ACCOUNT", "FETCHING");
      try {
        setFlag("ACCOUNT", "FETCHED");
        const result = await API.get<{ userID: string; username: string }>(
          "account"
        );

        if (result)
          dispatch(
            setAccountData({
              userID: result.userID,
            })
          );
      } catch (e) {
        console.error(e);
      }
    };

    if (!getFlag("ACCOUNT")) {
      fetchAccountID();
    }
    return accountID;
  };

  const getBillsList = () => {
    const fetchBillList = async () => {
      try {
        const result = await API.get<AccountBill[]>("bill");

        if (result) {
          dispatch(setAccountBill(result));
        }
      } catch (e) {
        console.error(e);
      }
    };

    if (!bills) {
      fetchBillList();
    }

    return bills || [];
  };

  const getRequestList = () => {
    const fetchRequestList = async () => {
      try {
        const result = await API.get<AccountRequest[]>("request");

        if (result) {
          dispatch(setRequestList(result));
        }
      } catch (e) {
        console.error(e);
      }
    };

    if (!requests) {
      fetchRequestList();
    }

    return requests || [];
  };

  return { getAccountID, getBillsList, getRequestList };
};
