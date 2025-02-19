import { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { Button } from "src/components/Button/Button";
import { HorizontalList } from "src/components/inputs/HorizontalList/HorizontalList";
import { InputNumber } from "src/components/inputs/InputNumber/InputNumber";
import { InputText } from "src/components/inputs/InputText/InputText";
import { MultiSelect } from "src/components/inputs/MultiSelect/MultiSelect";
import { SingleSelect } from "src/components/inputs/SingleSelect/SingleSelect";
import { useAccountHook } from "src/features/account/hook/useAccountHook";
import { useBillsHook } from "src/features/bills/hook/useBillsHook";
import { SelectedOption } from "src/types/other/SelectedOption";

import { ModalWrapper } from "../../ModalWrapper";
import { NewPaymentSwitch } from "./components/NewPaymentSwitch/NewPaymentSwitch";
import { newPaymentInitValues } from "./const/NewPaymentInitValue";
import { NewPaymentContextProvider } from "./context/NewPaymentContext";
import {
  preparePaymentToSend,
  validateNewPayment,
} from "./helpers/NewPaymentHelper";
import { NewPaymentReducer } from "./reducer/NewPaymentReducer";
import { ModalWrapperProps } from "src/interfaces/modal/ModalWrapperProps";
import { SplitType } from "src/enums/SplitType/SplitType";
import { useUsersHook } from "src/features/users/hook/useUsersHook";
import { useCurrencyHook } from "src/features/currency/hook/useCurrencyHook";
import { useAPI } from "src/hooks/useAPI/useAPI";
import { ButtonColor } from "src/enums/ButtonColor/ButtonColor";

interface NewPaymentModalProps extends ModalWrapperProps {}

const splitTypeOption: SelectedOption[] = Object.entries(SplitType).map(
  ([id, value]) => ({
    id,
    value: value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
  })
);

export const NewPaymentModal = ({
  isOpen,
  onRejected,
  ...wrapperProps
}: NewPaymentModalProps) => {
  const [state, dispatch] = useReducer(NewPaymentReducer, newPaymentInitValues);
  const { billID } = useParams();
  const { getBillData } = useBillsHook();
  const { getUsername } = useUsersHook();
  const { getAccountID } = useAccountHook();
  const { getCurrency } = useCurrencyHook();
  const { post } = useAPI();

  useEffect(() => {
    dispatch({ type: "PAID_BY", payload: getAccountID() });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAccountID()]);

  useEffect(() => {
    if (billID) {
      if (!isOpen) {
        dispatch({ type: "RESET" });
        dispatch({ type: "PAID_BY", payload: getAccountID() });
        return;
      }
      const bill = getBillData(billID);
      if (bill) {
        dispatch({
          type: "PARTICIPANTS",
          payload: bill.users.map((item) => item.id),
        });
        dispatch({ type: "CURRENCY", payload: bill.currency });
        dispatch({ type: "SET_BILL_ID", payload: billID });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [billID, getBillData(billID), isOpen]);

  const sendPayment = async () => {
    await post({
      url: "/payment",
      body: preparePaymentToSend(
        state,
        getCurrency(state.currencyCode)?.decimalDigits || 0
      ),
    });

    if (onRejected) onRejected();
  };

  const getUsersFromBill = () => {
    const bill = getBillData(billID);
    if (!bill) return [];
    return bill.users.map<SelectedOption>((item) => {
      return { id: item.id, value: getUsername(item.id) };
    });
  };

  return (
    <ModalWrapper
      onRejected={onRejected}
      isOpen={isOpen}
      {...wrapperProps}
      className="flex flex-col items-center gap-5"
    >
      <NewPaymentContextProvider state={state} dispatch={dispatch}>
        <h3 className="text-center text-3xl font-semibold">New Payment</h3>
        <InputText
          label="Payment title"
          value={state.paymentTitle}
          onChange={(val) =>
            dispatch({ type: "TITLE", payload: val.target.value })
          }
        />
        <InputNumber
          symbol={getCurrency(state.currencyCode)?.symbol}
          value={state.amount}
          onChange={(e) =>
            dispatch({ type: "AMOUNT", payload: e.target.value })
          }
          precision={getCurrency(state.currencyCode)?.decimalDigits}
        />
        <div className="flex flex-col md:flex-row w-full gap-5">
          <div className="w-full md:w-1/2">
            <SingleSelect
              label={`Paid by ${
                state.paidBy ? `(${getUsername(state.paidBy)})` : ""
              }`}
              options={getUsersFromBill()}
              value={state.paidBy}
              onChange={(val) => {
                dispatch({ type: "PAID_BY", payload: val });
              }}
              button={{ className: "h-10 w-full truncate" }}
            />
          </div>
          <div className="w-full md:w-1/2">
            <MultiSelect
              label={`Participants (${state.participants.length})`}
              options={getUsersFromBill()}
              values={state.participants}
              onChange={(val) => {
                dispatch({ type: "PARTICIPANTS", payload: val });
              }}
              button={{ className: "h-10" }}
            />
          </div>
        </div>
        <HorizontalList
          className="scale-[0.85] sm:scale-100"
          options={splitTypeOption}
          value={state.splitType}
          onClick={(val) =>
            dispatch({ type: "SPLIT_TYPE", payload: val as SplitType })
          }
        />
        <NewPaymentSwitch />
        <Button
          color={ButtonColor.GREEN}
          text="Save"
          disabled={!validateNewPayment(state)}
          onClick={sendPayment}
        />
      </NewPaymentContextProvider>
    </ModalWrapper>
  );
};
