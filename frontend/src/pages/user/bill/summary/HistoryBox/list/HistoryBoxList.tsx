import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ExpandableBar } from "src/components/ExpandableBar/ExpandableBar";
import { VirtualList } from "src/components/VirtualList/VirtualList";
import { useBillsHook } from "src/features/bills/hook/useBillsHook";
import { useCurrencyFormatter } from "src/hooks/useCurrencyFormatter/useCurrencyFormatter";
import { useExtraHight } from "src/hooks/useExtraHight/useExtraHight";
import { BillPayment } from "src/types/bill/BillPayment";

import HistoryBoxBarBody from "./bar/HistoryBoxBarBody";

interface HistoryBoxListProps {
  payments: BillPayment[];
}

const HistoryBoxList = ({ payments }: HistoryBoxListProps) => {
  const [isOpenList, setOpenList] = useState<{ [key: string]: boolean }>({});
  const {
    getExtraHeights,
    updateExtraHeight,
    clearExtraHeight,
    calcExtraHeight,
  } = useExtraHight();
  const { setCurrencyCode, currencyWithFormat } = useCurrencyFormatter();
  const { billID } = useParams();
  const { getBillData } = useBillsHook();

  useEffect(() => {
    if (billID) {
      setCurrencyCode(getBillData(billID)?.currency || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [billID, getBillData(billID)]);

  useEffect(() => {
    clearExtraHeight();
    setOpenList({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payments.length]);

  const rowElement = (index: number, style: React.CSSProperties) => {
    const id = getBillData(billID)?.payments[index].id || index;
    return (
      <ExpandableBar
        key={id}
        style={style}
        className="px-3"
        isOpen={isOpenList[index]}
        resizeCallback={(val) => {
          updateExtraHeight(val, index);
        }}
        onClick={() => {
          setOpenList((prev) => {
            prev[index] = !prev[index];
            return { ...prev };
          });
        }}
        barElement={
          <div className="flex flex-row justify-between w-full">
            <div className="font-semibold text-slate-800 truncate">
              {payments[index].title}
            </div>
            <div className="font-semibold text-slate-700 italic">
              {currencyWithFormat(payments[index].amount)}
            </div>
          </div>
        }
      >
        <HistoryBoxBarBody
          currencyCode={getBillData(billID)?.currency}
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

export default HistoryBoxList;
