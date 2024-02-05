import { useNewPaymentContext } from "../../hook/new-payment.hook";
import { NewPaymentAmountSplit } from "../amount-split/new-payment-amount-split.component";
import { NewPaymentEqualSplit } from "../equal-split/new-payment-equal-split.component";

export const NewPaymentSwitch = () => {
  const { state } = useNewPaymentContext();

  switch (state.splitType) {
    case "EQUAL":
      return <NewPaymentEqualSplit />;
    case "AMOUNT":
      return <NewPaymentAmountSplit />;
  }
};
