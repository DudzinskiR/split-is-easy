import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "src/components/button/button.component";
import { ExpandableBar } from "src/components/expandable-bar/expandable-bar.component";
import {
  SettleData,
  SettleModal,
} from "src/components/modal/modals/settle-modal/settle-modal.component";
import { ButtonColor } from "src/enums/button-color/button-color";
import { useAccountHook } from "src/features/account/hook/account.hook";
import { useBillsHook } from "src/features/bills/hook/bill.hook";
import { useUsersHook } from "src/features/users/hook/user.hook";
import { useCurrencyFormatter } from "src/hooks/currency-formatter/currency-formatter.hook";
import { useVisibilityToggle } from "src/hooks/visibility-toggle/visibility-toggle.hook";
import { TransactionBetweenUsers } from "src/types/bill/transaction-between-users.type";

interface SummaryBoxReceivablesProps {
  transactions: TransactionBetweenUsers[];
  userID: string;
  balance: number;
  currencyCode: string;
}

export const SummaryBoxReceivables = ({
  transactions,
  userID,
  currencyCode,
  balance,
}: SummaryBoxReceivablesProps) => {
  const [settleData, setSettleData] = useState<SettleData>();
  const { getUsername } = useUsersHook();
  const { setCurrencyCode, currencyWithoutFormat } = useCurrencyFormatter();
  const settleModal = useVisibilityToggle();
  const { billID } = useParams();
  const { getBillData } = useBillsHook();
  const { getAccountID } = useAccountHook();
  useEffect(() => {
    setCurrencyCode(currencyCode);
  }, [currencyCode, setCurrencyCode]);

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
      currency: getBillData(billID)?.currency || "",
      value: currencyWithoutFormat(value, "WITHOUT_SYMBOL") || "",
      text: `${getUsername(getAccountID())} gave the money to ${getUsername(
        userID
      )}`,
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
                  {getUsername(item.fromUserID)}
                </div>
                <div className="font-semibold text-slate-700 italic">
                  {currencyWithoutFormat(item.amount)}
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
                  {getUsername(item.toUserID)}
                </div>
                <div className="flex flex-row items-center gap-3">
                  <div className="font-semibold text-slate-700 italic">
                    {currencyWithoutFormat(item.amount)}
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
