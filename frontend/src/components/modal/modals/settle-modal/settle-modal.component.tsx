import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "src/components";
import { InputNumber, InputText } from "src/components/inputs";
import { ModalWrapper } from "src/components/modal";
import { ButtonColor } from "src/enums";
import { useAccountHook, useCurrencyHook } from "src/features";
import { useAPI, useCurrencyFormatter } from "src/hooks";
import { ModalWrapperProps } from "src/interfaces";

export type SettleData = {
  currency: string;
  value: string;
  text: string;
  toUserID: string;
};

interface SettleModalProps extends ModalWrapperProps {
  settleData: SettleData | undefined;
  setOpen: (open: boolean) => void;
  onChangeData: (data: SettleData) => void;
}

export const SettleModal = ({
  settleData,
  onChangeData,
  setOpen,
  ...wrapperProps
}: SettleModalProps) => {
  const [isSending, setSending] = useState(false);
  const { getCurrency } = useCurrencyHook();
  const { setCurrencyCode, getCurrencyCode } = useCurrencyFormatter();
  const { post } = useAPI();
  const { billID } = useParams();
  const { getAccountID } = useAccountHook();
  useEffect(() => {
    setCurrencyCode(settleData?.currency || "");
  }, [setCurrencyCode, settleData?.currency]);

  const onChangeHandler = (data: Partial<SettleData>) => {
    const newData: SettleData = {
      toUserID: settleData?.toUserID || "",
      currency: settleData?.currency || "",
      value: data.value ?? (settleData?.value || ""),
      text: data.text ?? (settleData?.text || ""),
    };
    onChangeData(newData);
  };

  const validateData = (data: SettleData | undefined) => {
    if (!data) return false;
    if (data.text.length < 3) return false;
    if (data.value.length === 0) return false;

    return true;
  };

  const sendPayment = () => {
    if (!settleData) return;
    setSending(true);
    post({
      url: "/payment",
      body: preparePaymentToSend(settleData),
      onSuccess: () => {
        setSending(false);
        setOpen(false);
      },
    });
  };

  const preparePaymentToSend = (data: SettleData) => {
    return {
      title: data.text,
      splitType: "EQUAL",
      paidBy: getAccountID(),
      amount: convertStringToValue(data.value, 2),
      billID: billID,
      currency: getCurrencyCode(),
      participants: [
        {
          userID: data.toUserID,
          auto: true,
          value: convertStringToValue(data.value, 2),
        },
      ],
    };
  };

  const convertStringToValue = (
    value: string,
    decimalDigitsOfCurrency: number
  ) => {
    const floatValue = parseFloat(value);
    const intValue = Math.round(floatValue * 10 ** decimalDigitsOfCurrency);

    return intValue;
  };

  return (
    <ModalWrapper {...wrapperProps}>
      <div className="text-3xl text-center font-semibold">Settle</div>
      <div className="flex flex-col items-center gap-5">
        <InputText
          label="Title"
          value={settleData?.text}
          onChange={(val) => onChangeHandler({ text: val.target.value })}
        />
        <InputNumber
          symbol={getCurrency(settleData?.currency || "")?.symbol}
          value={settleData?.value || ""}
          onChange={(val) => {
            onChangeHandler({
              value: val.target.value,
            });
          }}
        />
        <Button
          color={ButtonColor.GREEN}
          text="Settle"
          className="w-32"
          onClick={sendPayment}
          disabled={!validateData(settleData) || isSending}
        />
      </div>
    </ModalWrapper>
  );
};
