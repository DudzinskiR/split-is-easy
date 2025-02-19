import { useEffect, useReducer } from "react";
import { BsFilterSquare } from "react-icons/bs";
import { FadeInOut } from "src/components/FadeInOut/FadeInOut";
import { InputText } from "src/components/inputs/InputText/InputText";
import { MultiSelect } from "src/components/inputs/MultiSelect/MultiSelect";
import { useVisibilityToggle } from "src/hooks/useVisibilityToggle/useVisibilityToggle";
import {
  filterByAmount,
  filterByPayers,
  filterByRecipients,
  filterByTitle,
  filterPayments,
} from "src/pages/user/bill/summary/HistoryBox/filter/helper/historyBoxFilter";
import { BillPayment } from "src/types/bill/BillPayment";
import { SelectedOption } from "src/types/other/SelectedOption";

import { DemoHistoryBoxReducerInitValues } from "./initValue/DemoHistoryBoxFilterInitValue";
import { HistoryBoxFilterReducer } from "src/pages/user/bill/summary/HistoryBox/filter/reducer/HistoryBoxFilterReducer";
import { useDemoPageContext } from "src/pages/demo/hook/useDemoPageContext";

interface DemoHistoryBoxFilterProps {
  payments: BillPayment[];
  users: string[];
  onChange: (payments: BillPayment[]) => void;
}

export const DemoHistoryBoxFilter = ({
  payments,
  users,
  onChange,
}: DemoHistoryBoxFilterProps) => {
  const { isOpen, setOpen } = useVisibilityToggle();
  const { state: demoPageState } = useDemoPageContext();
  const [state, dispatch] = useReducer(
    HistoryBoxFilterReducer,
    DemoHistoryBoxReducerInitValues
  );

  useEffect(() => {
    if (users.length !== 0 && state.users.length === 0) {
      dispatch({ type: "INIT", payload: users });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  const getDecimalPlacesFromCurrency = () => {
    const bill = demoPageState.bill;
    if (!bill) return 0;

    return demoPageState.currency.decimalDigits || 0;
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
    console.log("state");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  useEffect(() => {
    console.log("nowe");
    onChange(filter(payments));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payments]);

  const getOptionsFromUserList = () => {
    return state.users.map<SelectedOption>((item) => {
      return { id: item, value: demoPageState.username[item] };
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
