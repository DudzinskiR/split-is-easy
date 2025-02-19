import { AxiosError } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "src/features/store";
import { setUsernames } from "src/features/users/usersSlice";
import { useGlobalFlagContext } from "src/hooks/useGlobalFlagContext/useGlobalFlagContext";
import { Bill } from "src/types/bill/Bill";
import { BillAdminData } from "src/types/bill/BillAdminData";
import { BillPayment } from "src/types/bill/BillPayment";
import { Exception } from "src/types/exception/Exception";
import { API } from "src/utils/api/api";

import { setBillAdminData, setBillData, setPayments } from "../billsSlice";

export const useBillsHook = () => {
  const bills = useSelector((state: RootState) => state.bills.bills);
  const { setFlag, getFlag } = useGlobalFlagContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getBillData = (
    billID: string | undefined,
    callback?: (bill: Bill) => void
  ) => {
    if (!billID) return undefined;

    if (!getFlag(billID)) {
      fetchBillData(billID, callback);
    }

    return bills[billID];
  };

  const getAdminBillData = (billID: string) => {
    const bill = bills[billID];

    if (!bill.admin && !getFlag(`${billID}/admin`)) fetchAdminBillData(billID);
    return bill.admin;
  };

  const checkAdminStatus = (billID: string, userID: string) => {
    const bill = bills[billID];

    if (!bill) {
      fetchBillData(billID);
      return false;
    }

    return !!bill.admins.find((item) => item === userID);
  };

  const fetchBillData = async (
    billID: string,
    callback?: (bill: Bill) => void
  ) => {
    setFlag(billID, "FETCHING");
    try {
      const result = await API.get<Bill>(`bill/${billID}`);
      setFlag(billID, "FETCHED");
      if (result) {
        dispatch(setBillData(result));
        dispatch(setUsernames(result.users));
        if (callback) callback(result);
      }
    } catch (e) {
      if ((e as AxiosError<Exception>).response?.data.code === "PER001") {
        navigate("/no-access");
      }
    }

    if (!getFlag(`${billID}/payments`)) {
      await fetchPayments(billID);
    }
  };

  const fetchPayments = async (billID: string) => {
    setFlag(`${billID}/payments`, "FETCHING");
    try {
      const result = await API.get<BillPayment[]>(`bill/${billID}/payment`);
      setFlag(`${billID}/payments`, "FETCHED");
      if (result) {
        dispatch(setPayments({ payments: result, id: billID }));
      }
    } catch (e) {
      if ((e as AxiosError<Exception>).response?.data.code === "PER001") {
        navigate("/no-access");
      }
    }
  };

  const fetchAdminBillData = async (billID: string) => {
    const bill = bills[billID];
    setFlag(`${billID}/admin`, "FETCHING");
    if (!bill) {
      await fetchBillData(billID);
    }

    try {
      const result = await API.get<BillAdminData>(`bill/${billID}/admin`);
      if (result) {
        setFlag(`${billID}/admin`, "FETCHED");
        dispatch(setBillAdminData({ adminData: result, billID: billID }));
      }
    } catch (e) {
      if ((e as AxiosError<Exception>).response?.data.code === "PER001") {
        navigate("/no-access");
      }
    }
  };

  return {
    getBillData,
    checkAdminStatus,
    getAdminBillData,
  };
};
//as
