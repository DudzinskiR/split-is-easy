import { useUsersHook } from "src/features/users/hook";
import { useNewPaymentContext } from "../../hook/new-payment.hook";
import { useCurrencyHook } from "src/features";
import { ChangeEvent, useEffect } from "react";
import { UserSplitInfo } from "src/types";
import { splitAmount, sumValues } from "../../helpers/new-payment.helper";
import { checkIsWithinErrorMargin, roundToPlaces } from "src/utils/helpers";
import { Checkbox, InputNumber } from "src/components/inputs";
import { NewPaymentSplitterList } from "../list/new-payment-list.component";

export const NewPaymentAmountSplit = () => {
  const { state, dispatch } = useNewPaymentContext();
  const { getUsername } = useUsersHook();
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
  }, [state.amount, state.participants]);

  const changeValues =
    (userID: string) => (e: ChangeEvent<HTMLInputElement>) => {
      const newValues = { ...state.values };
      newValues[userID] = {
        value: e.target.value,
        auto: false,
      };

      dispatch({
        type: "SET_VALUES",
        payload: splitAmount(newValues, state.amount),
      });
    };

  const changeAutoMode =
    (userID: string) => (e: ChangeEvent<HTMLInputElement>) => {
      const newValues = { ...state.values };
      newValues[userID].auto = e.target.checked;

      dispatch({
        type: "SET_VALUES",
        payload: splitAmount(newValues, state.amount),
      });
    };

  const renderSplitInfo = () => {
    const amount = parseFloat(state.amount);
    const sum = sumValues(state.values);
    const delta = roundToPlaces(
      amount - sum,
      getCurrency(state.currencyCode)?.decimalDigits
    );

    if (Number.isNaN(amount) || Number.isNaN(sum)) {
      return "It's ok";
    }

    const isWithinErrorMargin = checkIsWithinErrorMargin(delta, 0, 0.0001);
    if (isWithinErrorMargin) return "OK";

    if (delta < 0) {
      return `Za dużo o ${delta}${getCurrency(state.currencyCode)?.symbol}`;
    } else {
      if (delta > 0) {
        return `Za mało o ${delta}${getCurrency(state.currencyCode)?.symbol}`;
      }
    }
  };

  const getInputNumberValues = (index: number) => {
    const userID = state.participants[index];
    const value = roundToPlaces(
      state.values[userID]?.value,
      getCurrency(state.currencyCode)?.decimalDigits
    );

    if (Number.isNaN(value)) {
      return "";
    } else {
      return value;
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-center duration-150">
        {renderSplitInfo()}
      </div>
      <NewPaymentSplitterList
        rowElement={(index, style) => (
          <div
            key={state.participants[index]}
            style={style}
            className="flex flex-row"
          >
            <div className="w-1/2 md:w-2/3 text-xl pl-5">
              {getUsername(state.participants[index])}
            </div>

            <div className="flex flex-row w-1/2 md:w-1/3 pr-3">
              <InputNumber
                symbol={getCurrency(state.currencyCode)?.symbol}
                onChange={changeValues(state.participants[index])}
                value={getInputNumberValues(index)}
                precision={getCurrency(state.currencyCode)?.decimalDigits}
              />
              <Checkbox
                className="h-full w-5 ml-2"
                checked={state.values[state.participants[index]]?.auto || false}
                onChange={changeAutoMode(state.participants[index])}
              />
            </div>
          </div>
        )}
      />
    </div>
  );
};
