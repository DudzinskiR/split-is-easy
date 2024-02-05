import { useEffect } from "react";
import { useUsersHook } from "src/features/users/hook";
import { useCurrencyFormatter } from "src/hooks";
import { PaymentParticipants } from "src/types";
import HistoryBoxBarText from "./text/history-box-bar-text.component";
import { DateFormatter } from "src/utils/helpers";

export interface HistoryBoxBarBodyProps {
  title: string;
  amount: number;
  date: string;
  recipient: PaymentParticipants[];
  paidBy: string;
  currencyCode?: string;
}

const HistoryBoxBarBody = ({
  title,
  amount,
  date,
  recipient,
  paidBy,
  currencyCode,
}: HistoryBoxBarBodyProps) => {
  const { currencyWithoutFormat, setCurrencyCode } = useCurrencyFormatter();
  const { getUsername } = useUsersHook();

  useEffect(() => {
    setCurrencyCode(currencyCode || "");
  }, [currencyCode, setCurrencyCode]);

  return (
    <div className="p-3">
      <div className="w-full flex flex-col gap-5">
        <HistoryBoxBarText title="Description">{title}</HistoryBoxBarText>
        <div className="grid grid-cols-2">
          <HistoryBoxBarText title="Amount">
            {currencyWithoutFormat(amount)}
          </HistoryBoxBarText>
          <HistoryBoxBarText title="Date">
            {DateFormatter.ddMMyyyy(date)}
          </HistoryBoxBarText>
        </div>

        <div className="grid grid-cols-2">
          <HistoryBoxBarText title="Recipient">
            <div className="flex flex-col">
              {recipient.map((item) => (
                <div
                  key={item.userID}
                  className="flex flex-row justify-between pr-2"
                >
                  <div className="text-lg truncate">
                    {getUsername(item.userID)}
                  </div>
                  <div className="text-sm flex items-center italic font-medium">
                    {currencyWithoutFormat(item.value)}
                  </div>
                </div>
              ))}
            </div>
          </HistoryBoxBarText>
          <HistoryBoxBarText title="Paid by">
            <div className="flex flex-col truncate">{getUsername(paidBy)}</div>
          </HistoryBoxBarText>
        </div>
      </div>
    </div>
  );
};

export default HistoryBoxBarBody;
