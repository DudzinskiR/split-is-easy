import { useState } from "react";
import { useParams } from "react-router-dom";
import { useBillsHook } from "src/features/bills/hook/useBillsHook";

import { HistoryBoxFilter } from "./filter/HistoryBoxFilter";
import HistoryBoxList from "./list/HistoryBoxList";
import { BillPayment } from "src/types/bill/BillPayment";
import { useGlobalFlagContext } from "src/hooks/useGlobalFlagContext/useGlobalFlagContext";
import { Box } from "src/components/Box/Box";

export const HistoryBox = () => {
  const [payments, setPayments] = useState<BillPayment[]>([]);
  const { billID } = useParams();
  const { getBillData } = useBillsHook();
  const { getFlag } = useGlobalFlagContext();
  const getUsersIDList = () => {
    const bill = getBillData(billID);
    if (!bill) return [];
    return bill.users.map((item) => item.id);
  };

  const renderHistoryList = () => {
    if (getFlag(`${billID}/payments`) !== "FETCHED") {
      return (
        <div className="w-full h-[371px] flex justify-center items-center text-3xl font-bold text-slate-300 select-none">
          Loading...
        </div>
      );
    }
    if (payments.length > 0) {
      return <HistoryBoxList payments={payments} />;
    } else {
      return (
        <div className="w-full h-[371px] flex justify-center items-center text-3xl font-bold text-slate-300 select-none">
          No payment here yet
        </div>
      );
    }
  };

  return (
    <Box title="History" className="relative pb-2 flex flex-col">
      <HistoryBoxFilter
        payments={getBillData(billID)?.payments || []}
        users={getUsersIDList()}
        onChange={(val) => setPayments(val)}
      />
      {renderHistoryList()}
    </Box>
  );
};
