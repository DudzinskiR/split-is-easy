import { useParams } from "react-router-dom";
import { useBillsHook } from "src/features/bills/hook/bill.hook";
import { useDocumentTitle } from "src/hooks/document-title/document-title.hook";
import { useNavbarList } from "src/hooks/navbar-list/navbar-list.hook";
import { billPageNavbarData } from "src/utils/navbar-list/bill-page-navbar-data/bill-page-navbar-data";

import HistoryBox from "./history-box/history-box";
import NewPayment from "./new-payment.component";
import SummaryBox from "./summary-box/summary-box.component";

export const BillSummaryPage = () => {
  const { billID } = useParams();
  const { getBillData } = useBillsHook();
  useNavbarList(billPageNavbarData, 1, { key: ":billID", value: billID! });
  useDocumentTitle(`${getBillData(billID)?.name || "loading"}`, [
    getBillData(billID),
  ]);

  return (
    <div className="flex lg:flex-row flex-col w-full justify-between mt-5 gap-5 px-5">
      <SummaryBox />
      <HistoryBox />
      <NewPayment />
    </div>
  );
};
