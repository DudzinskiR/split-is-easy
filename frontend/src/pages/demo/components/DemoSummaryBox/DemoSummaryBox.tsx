import { useEffect, useState } from "react";
import { Box } from "src/components/Box/Box";
import { PieChartData } from "src/components/PieChart/interface/PieChartData";
import PieChart from "src/components/PieChart/PieChart";

import { DemoSummaryBoxReceivables } from "./receivables/DemoSummaryBoxReceivables";
import { useDemoPageContext } from "../../hook/useDemoPageContext";

export const DemoSummaryBox = () => {
  const { state } = useDemoPageContext();
  const [pieChartData, setPieChartData] = useState<PieChartData[]>([]);

  const getAccountID = () => {
    return "1";
  };

  useEffect(() => {
    const bill = state.bill;
    if (!bill) return;

    const userBalance = bill.usersBalance.find(
      (item) => item.userID === getAccountID()
    );

    if (userBalance?.value && userBalance?.value > 0) {
      const transactionToUser = bill.transaction.filter(
        (item) => item.toUserID === getAccountID()
      );

      const chartData = transactionToUser.map<PieChartData>((item) => {
        return {
          value: item.amount,
          label: state.username[item.fromUserID],
        };
      });

      setPieChartData(chartData);
    } else {
      const transactionToUser = bill.transaction.filter(
        (item) => item.fromUserID === getAccountID()
      );

      const chartData = transactionToUser.map<PieChartData>((item) => {
        return {
          value: -item.amount,
          label: state.username[item.toUserID],
        };
      });

      setPieChartData(chartData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  // if (getFlag(`${billID}/payments`) !== "FETCHED") {
  //   return (
  //     <Box title="Summary" className="overflow-hidden flex flex-col pb-3">
  //       <div className="w-full h-[371px] flex justify-center items-center text-3xl font-bold text-slate-300 select-none">
  //         Loading...
  //       </div>
  //     </Box>
  //   );
  // }

  return (
    <Box title="Summary" className="overflow-hidden flex flex-col pb-3">
      <div className="w-full flex justify-center xl:scale-[1] sm:scale-90 xs:scale-[0.8] scale-[0.5] duration-150 py-5">
        <PieChart
          maxLabelWidth={150}
          data={pieChartData}
          currencyCode={state.currency.code}
        />
      </div>
      <DemoSummaryBoxReceivables
        transactions={state.bill.transaction || []}
        userID={getAccountID()}
        currencyCode={state.currency.code}
        balance={
          state.bill.usersBalance.find((item) => item.userID === getAccountID())
            ?.value || 0
        }
      />
    </Box>
  );
};
