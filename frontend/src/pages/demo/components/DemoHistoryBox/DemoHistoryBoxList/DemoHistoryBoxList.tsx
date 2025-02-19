import { useEffect, useState } from "react";
import { ExpandableBar } from "src/components/ExpandableBar/ExpandableBar";
import { VirtualList } from "src/components/VirtualList/VirtualList";
import { useExtraHight } from "src/hooks/useExtraHight/useExtraHight";
import { BillPayment } from "src/types/bill/BillPayment";

import HistoryBoxBarBody from "./DemoHistoryBar/HistoryBoxBarBody";
import { demoCurrencyWithoutFormat } from "../../../mock/demoCurrencyWithoutFormat";
import { useDemoPageContext } from "src/pages/demo/hook/useDemoPageContext";

interface DemoHistoryBoxListProps {
  payments: BillPayment[];
}

export const DemoHistoryBoxList = ({ payments }: DemoHistoryBoxListProps) => {
  const [isOpenList, setOpenList] = useState<{ [key: string]: boolean }>({});
  const { state } = useDemoPageContext();
  const {
    getExtraHeights,
    updateExtraHeight,
    clearExtraHeight,
    calcExtraHeight,
  } = useExtraHight();

  useEffect(() => {
    clearExtraHeight();
    setOpenList({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payments.length]);

  const rowElement = (index: number, style: React.CSSProperties) => {
    const id = state.bill.payments[index].id || index;
    return (
      <ExpandableBar
        key={id}
        style={style}
        className="px-3"
        isOpen={isOpenList[id]}
        resizeCallback={(val) => {
          updateExtraHeight(
            val,
            state.bill.payments.length - parseInt(`${id}`) - 1
            // parseInt(`${id}`)
          );
        }}
        onClick={() => {
          setOpenList((prev) => {
            prev[id] = !prev[id];
            return { ...prev };
          });
        }}
        barElement={
          <div className="flex flex-row justify-between w-full">
            <div className="font-semibold text-slate-800 truncate">
              {payments[index].title}
            </div>
            <div className="font-semibold text-slate-700 italic">
              {demoCurrencyWithoutFormat(payments[index].amount)}
            </div>
          </div>
        }
      >
        <HistoryBoxBarBody
          currencyCode={state.bill.currency}
          title={payments[index].title}
          amount={payments[index].amount}
          date={payments[index].createdAt}
          recipient={payments[index].participants}
          paidBy={payments[index].paidBy}
        />
      </ExpandableBar>
    );
  };

  return (
    <VirtualList
      height={Math.min(60 * payments.length + calcExtraHeight(), 500)}
      extraHeight={getExtraHeights()}
      itemCount={payments.length}
      itemHeight={60}
      rowElement={rowElement}
    />
  );
};
