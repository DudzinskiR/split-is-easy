import { useState } from "react";
import { Button } from "src/components/Button/Button";
import { ExpandableBar } from "src/components/ExpandableBar/ExpandableBar";
import {
  SettleData,
  SettleModal,
} from "src/components/modal/modals/SettleModal/SettleModal";
import { ButtonColor } from "src/enums/ButtonColor/ButtonColor";
import { useVisibilityToggle } from "src/hooks/useVisibilityToggle/useVisibilityToggle";
import { useDemoPageContext } from "src/pages/demo/hook/useDemoPageContext";
import { demoCurrencyWithoutFormat } from "src/pages/demo/mock/demoCurrencyWithoutFormat";
import { TransactionBetweenUsers } from "src/types/bill/TransactionBetweenUsers";

interface SummaryBoxReceivablesProps {
  transactions: TransactionBetweenUsers[];
  userID: string;
  balance: number;
  currencyCode: string;
}

export const DemoSummaryBoxReceivables = ({
  transactions,
  userID,
  balance,
}: SummaryBoxReceivablesProps) => {
  const { state } = useDemoPageContext();
  const [settleData, setSettleData] = useState<SettleData>();
  const settleModal = useVisibilityToggle();

  const getAccountID = () => {
    return "1";
  };

  const renderList = () => {
    if (balance > 0) {
      return renderListWithPositiveBalance();
    } else if (balance < 0) {
      return renderListWithNegativeBalance();
    } else {
      return renderListWithZeroBalance();
    }
  };

  const getSettleData = (value: number, userID: string) => {
    setSettleData({
      toUserID: userID,
      currency: state.bill.currency || "",
      value: demoCurrencyWithoutFormat(value, "WITHOUT_SYMBOL") || "",
      text: `${state.username[getAccountID()]} gave the money to ${
        state.username[userID]
      }`,
    });
  };

  const renderListWithPositiveBalance = () => {
    const transactionToRender = transactions.filter(
      (item) => item.toUserID === userID
    );

    return (
      <div className="flex flex-col items-center w-full">
        {transactionToRender.map((item) => (
          <ExpandableBar
            key={item.fromUserID}
            className="my-[6px] w-11/12"
            barElement={
              <div className="flex flex-row justify-between w-full">
                <div className="font-semibold text-slate-700">
                  {state.username[item.fromUserID]}
                </div>
                <div className="font-semibold text-slate-700 italic">
                  {demoCurrencyWithoutFormat(item.amount)}
                </div>
              </div>
            }
          />
        ))}
      </div>
    );
  };

  const renderListWithNegativeBalance = () => {
    const transactionToRender = transactions.filter(
      (item) => item.fromUserID === userID
    );
    return (
      <div className="flex flex-col items-center w-full">
        {transactionToRender.map((item) => (
          <ExpandableBar
            key={item.toUserID}
            onClick={() => {
              getSettleData(item.amount, item.toUserID);
              settleModal.setOpen(true);
            }}
            className="my-[6px] w-11/12"
            barElement={
              <div className="flex flex-row justify-between w-full">
                <div className="flex items-center font-semibold">
                  {state.username[item.toUserID]}
                </div>
                <div className="flex flex-row items-center gap-3">
                  <div className="font-semibold text-slate-700 italic">
                    {demoCurrencyWithoutFormat(item.amount)}
                  </div>
                  <Button
                    color={ButtonColor.GREEN}
                    text="Settle"
                    className="w w-24 h-8"
                  />
                </div>
              </div>
            }
          />
        ))}
      </div>
    );
  };

  const renderListWithZeroBalance = () => {
    return (
      <div className="flex justify-center items-center h-24 w-full text-2xl font-semibold text-slate-400">
        No transactions to show
      </div>
    );
  };

  return (
    <>
      {renderList()}
      <SettleModal
        isOpen={settleModal.isOpen}
        onRejected={() => settleModal.setOpen(false)}
        settleData={settleData}
        onChangeData={(data) => {
          setSettleData(data);
        }}
        setOpen={(val) => settleModal.setOpen(val)}
      />
    </>
  );
};
