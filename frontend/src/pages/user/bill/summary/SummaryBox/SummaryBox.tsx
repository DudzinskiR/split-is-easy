import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "src/components/Box/Box";
import { PieChartData } from "src/components/PieChart/interface/PieChartData";
import PieChart from "src/components/PieChart/PieChart";
import { useAccountHook } from "src/features/account/hook/useAccountHook";
import { useBillsHook } from "src/features/bills/hook/useBillsHook";
import { useCurrencyHook } from "src/features/currency/hook/useCurrencyHook";
import { useUsersHook } from "src/features/users/hook/useUsersHook";
import { useGlobalFlagContext } from "src/hooks/useGlobalFlagContext/useGlobalFlagContext";

import { SummaryBoxReceivables } from "./receivables/SummaryBoxReceivables";

export const SummaryBox = () => {
  const { billID } = useParams();
  const { getBillData } = useBillsHook();
  const [pieChartData, setPieChartData] = useState<PieChartData[]>([]);
  const { getAccountID } = useAccountHook();
  const { getUsername } = useUsersHook();
  const { getCurrency } = useCurrencyHook();
  const { getFlag } = useGlobalFlagContext();
  useEffect(() => {
    const bill = getBillData(billID);
    if (!bill) return;

    const userBalance = bill.usersBalance.find(
      (item) => item.userID === getAccountID()
    );

    if (userBalance?.value && userBalance?.value > 0) {
      const transactionToUser = bill.transaction.filter(
        (item) => item.toUserID === getAccountID()
      );

      const chartData = transactionToUser.map<PieChartData>((item) => {
        return { value: item.amount, label: getUsername(item.fromUserID) };
      });

      setPieChartData(chartData);
    } else {
      const transactionToUser = bill.transaction.filter(
        (item) => item.fromUserID === getAccountID()
      );

      const chartData = transactionToUser.map<PieChartData>((item) => {
        return {
          value: -item.amount,
          label: getUsername(item.toUserID),
        };
      });

      setPieChartData(chartData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getBillData(billID)]);

  if (getFlag(`${billID}/payments`) !== "FETCHED") {
    return (
      <Box title="Summary" className="overflow-hidden flex flex-col pb-3">
        <div className="w-full h-[371px] flex justify-center items-center text-3xl font-bold text-slate-300 select-none">
          Loading...
        </div>
      </Box>
    );
  }

  return (
    <Box title="Summary" className="overflow-hidden flex flex-col pb-3">
      <div className="w-full flex justify-center xl:scale-[1] sm:scale-90 xs:scale-[0.8] scale-[0.5] duration-150 py-5">
        <PieChart
          maxLabelWidth={150}
          data={pieChartData}
          currencyCode={getCurrency(getBillData(billID)?.currency || "")?.code}
        />
      </div>
      <SummaryBoxReceivables
        transactions={getBillData(billID)?.transaction || []}
        userID={getAccountID()}
        currencyCode={
          getCurrency(getBillData(billID)?.currency || "")?.code || ""
        }
        balance={
          getBillData(billID)?.usersBalance.find(
            (item) => item.userID === getAccountID()
          )?.value || 0
        }
      />
    </Box>
  );
};
