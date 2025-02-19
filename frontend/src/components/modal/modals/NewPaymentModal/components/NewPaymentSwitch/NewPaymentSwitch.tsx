import { useNewPaymentContext } from "../../hook/useNewPaymentContext";
import { NewPaymentEqualSplit } from "../NewPaymentEqualSplit/NewPaymentEqualSplit";
import { NewPaymentAmountSplit } from "../NewPaymentAmountSplit/NewPaymentAmountSplit";

export const NewPaymentSwitch = () => {
  const { state } = useNewPaymentContext();

  switch (state.splitType) {
    case "EQUAL":
      return <NewPaymentEqualSplit />;
    case "AMOUNT":
      return <NewPaymentAmountSplit />;
  }
};
