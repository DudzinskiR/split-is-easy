import { useEffect } from "react";
import { useCurrencyHook } from "src/features";
import { UserSplitInfo } from "src/types";
import { roundToPlaces } from "src/utils/helpers";

import { splitAmount } from "../../helpers/new-payment.helper";
import { useNewPaymentContext } from "../../hook/new-payment.hook";

export const NewPaymentEqualSplit = () => {
  const { state, dispatch } = useNewPaymentContext();
  const { getCurrency } = useCurrencyHook();

  useEffect(() => {
    const newValues: UserSplitInfo = {};
    for (const item of state.participants) {
      if (state.values[item]) {
        newValues[item] = state.values[item];
      } else {
        newValues[item] = {
          value: "0",
          auto: true,
        };
      }
    }

    dispatch({
      type: "SET_VALUES",
      payload: splitAmount(newValues, state.amount),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.amount, state.participants]);

  useEffect(() => {
    dispatch({ type: "UPDATE_USER_VALUES" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.participants]);

  useEffect(() => {
    const newValues: UserSplitInfo = {};
    for (const item of state.participants) {
      newValues[item] = {
        value: "0",
        auto: true,
      };
    }

    dispatch({
      type: "SET_VALUES",
      payload: splitAmount(newValues, state.amount),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderDescription = () => {
    const currencySymbol = getCurrency(state.currencyCode)?.symbol;
    const amount = parseFloat(state.amount);
    const participantsNumber = state.participants.length;
    if (participantsNumber === 0) {
      return <></>;
    }

    const averagePayment = roundToPlaces(
      amount / participantsNumber,
      getCurrency(state.currencyCode)?.decimalDigits
    );
    return (
      <div>
        Everyone will pay {averagePayment}
        {currencySymbol}
      </div>
    );
  };
  return <div>{renderDescription()}</div>;
};
