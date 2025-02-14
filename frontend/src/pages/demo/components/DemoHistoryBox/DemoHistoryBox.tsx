import { Box } from "src/components/Box/Box";
import { DemoHistoryBoxList } from "./DemoHistoryBoxList/DemoHistoryBoxList";
import { DemoHistoryBoxFilter } from "./DemoHistoryBoxFiler/DemoHistoryBoxFilter";
import { useDemoPageContext } from "../../hook/useDemoPageContext";
import { useEffect, useState } from "react";
import { BillPayment } from "src/types/bill/BillPayment";

export const DemoHistoryBox = () => {
  const { state } = useDemoPageContext();
  const [payments, setPayments] = useState<BillPayment[]>([]);

  useEffect(() => {
    setPayments(state.bill.payments);
  }, [state.bill]);

  return (
    <Box title="History" className="relative pb-2 flex flex-col">
      <DemoHistoryBoxFilter
        payments={state.bill.payments}
        users={state.bill.users.map((item) => item.id)}
        onChange={(val) => {
          setPayments(val);
        }}
      />
      <DemoHistoryBoxList payments={payments} />
    </Box>
  );
};
