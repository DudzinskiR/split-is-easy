import { useParams } from "react-router-dom";
import { useBillsHook } from "src/features/bills/hook/useBillsHook";
import { useDocumentTitle } from "src/hooks/useDocumentTitle/useDocumentTitle";
import { useNavbarList } from "src/hooks/useNavbarList/useNavbarList";
import { billPageNavbarData } from "src/utils/NavbarList/billPageNavbarData/billPageNavbarData";

import { HistoryBox } from "./HistoryBox/HistoryBox";
import { NewPayment } from "./NewPayment";
import { SummaryBox } from "./SummaryBox/SummaryBox";

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
