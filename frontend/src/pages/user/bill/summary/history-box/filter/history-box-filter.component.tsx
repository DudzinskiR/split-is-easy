import { useEffect, useReducer } from "react";
import { useVisibilityToggle } from "src/hooks";
import { BillPayment, SelectedOption } from "src/types";
import { HistoryBoxFilterReducer } from "./reducer/history-box-filter.reducer";
import { HistoryBoxReducerInitValues } from "./init-value/history-box-filter-init-value";
import { useUsersHook } from "src/features/users/hook";
import { useBillsHook, useCurrencyHook } from "src/features";
import { useParams } from "react-router-dom";
import {
  filterByAmount,
  filterByPayers,
  filterByRecipients,
  filterByTitle,
  filterPayments,
} from "./helper/history-box-filter.helper";
import { BsFilterSquare } from "react-icons/bs";
import { FadeInOut } from "src/components";
import { InputText, MultiSelect } from "src/components/inputs";

interface HistoryBoxFilterProps {
  payments: BillPayment[];
  users: string[];
  onChange: (payments: BillPayment[]) => void;
}

export const HistoryBoxFilter = ({
  payments,
  users,
  onChange,
}: HistoryBoxFilterProps) => {
  const { isOpen, setOpen } = useVisibilityToggle();
  const [state, dispatch] = useReducer(
    HistoryBoxFilterReducer,
    HistoryBoxReducerInitValues
  );
  const { getUsername } = useUsersHook();
  const { getBillData } = useBillsHook();
  const { billID } = useParams();
  const { getCurrency } = useCurrencyHook();

  useEffect(() => {
    if (users.length !== 0 && state.users.length === 0) {
      dispatch({ type: "INIT", payload: users });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  const getDecimalPlacesFromCurrency = () => {
    const bill = getBillData(billID);
    if (!bill) return 0;

    return getCurrency(bill.currency)?.decimalDigits || 0;
  };

  const filter = filterPayments(
    filterByTitle(state.searchText),
    filterByPayers(state.paidBy),
    filterByRecipients(state.recipients),
    filterByAmount(
      state.minAmount,
      state.maxAmount,
      getDecimalPlacesFromCurrency()
    )
  );
  useEffect(() => {
    onChange(filter(payments));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  useEffect(() => {
    onChange(filter(payments));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payments.length]);

  const getOptionsFromUserList = () => {
    return state.users.map<SelectedOption>((item) => {
      return { id: item, value: getUsername(item) };
    });
  };

  return (
    <>
      <div
        className="absolute right-12 top-3 text-3xl cursor-pointer"
        onClick={() => setOpen(!isOpen)}
      >
        <BsFilterSquare />
      </div>
      <FadeInOut
        isOpen={isOpen}
        className="py-5 flex justify-center"
        transitionDuration={150}
      >
        <div className="w-11/12">
          <InputText
            label="Search"
            value={state.searchText}
            onChange={(val) => {
              dispatch({ type: "SEARCH", payload: val.target.value });
            }}
          />
          <div className="flex flex-row gap-5 my-3">
            <MultiSelect
              button={{ className: "h-10" }}
              label={`Recipient (${state.recipients.length})`}
              options={getOptionsFromUserList()}
              values={state.recipients}
              onChange={(val) => dispatch({ type: "RECIPIENT", payload: val })}
            />
            <MultiSelect
              button={{ className: "h-10" }}
              label={`Paid By (${state.paidBy.length})`}
              options={getOptionsFromUserList()}
              values={state.paidBy}
              onChange={(val) => dispatch({ type: "PAID_BY", payload: val })}
            />
          </div>
          <div className="flex flex-row gap-10 mt-5">
            <div className="flex items-center">Amount:</div>
            <InputText
              label="Min"
              type="number"
              onChange={(val) =>
                dispatch({
                  type: "MIN_AMOUNT",
                  payload: parseFloat(val.target.value),
                })
              }
            />
            <InputText
              label="Max"
              type="number"
              onChange={(val) =>
                dispatch({
                  type: "MAX_AMOUNT",
                  payload: parseFloat(val.target.value),
                })
              }
            />
          </div>
        </div>
      </FadeInOut>
    </>
  );
};
