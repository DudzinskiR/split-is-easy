import { useDemoPageContext } from "src/pages/demo/hook/useDemoPageContext";
import { demoCurrencyWithoutFormat } from "src/pages/demo/mock/demoCurrencyWithoutFormat";
import HistoryBoxBarText from "src/pages/user/bill/summary/HistoryBox/list/bar/text/HistoryBoxBarText";
import { PaymentParticipants } from "src/types/bill/BillPayment";
import { DateFormatter } from "src/utils/helpers/DateFormatter/DateFormatter";

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
}: HistoryBoxBarBodyProps) => {
  const { state } = useDemoPageContext();
  return (
    <div className="p-3">
      <div className="w-full flex flex-col gap-5">
        <HistoryBoxBarText title="Description">{title}</HistoryBoxBarText>
        <div className="grid grid-cols-2">
          <HistoryBoxBarText title="Amount">
            {demoCurrencyWithoutFormat(amount)}
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
                    {state.username[item.userID]}
                  </div>
                  <div className="text-sm flex items-center italic font-medium">
                    {demoCurrencyWithoutFormat(item.value)}
                  </div>
                </div>
              ))}
            </div>
          </HistoryBoxBarText>
          <HistoryBoxBarText title="Paid by">
            <div className="flex flex-col truncate">
              {state.username[paidBy]}
            </div>
          </HistoryBoxBarText>
        </div>
      </div>
    </div>
  );
};

export default HistoryBoxBarBody;
