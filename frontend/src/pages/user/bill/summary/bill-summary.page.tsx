import { useParams } from "react-router-dom";
import { useDocumentTitle, useNavbarList } from "src/hooks";
import { billPageNavbarData } from "src/utils/navbar-list";
import NewPayment from "./new-payment.component";
import { useBillsHook } from "src/features";
import HistoryBox from "./history-box/history-box";
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
