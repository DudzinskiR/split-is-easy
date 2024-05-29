import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "src/components/button/button.component";
import { Checkbox } from "src/components/inputs/checkbox/checkbox.component";
import { InputText } from "src/components/inputs/input-text/input-text.component";
import { SingleSelect } from "src/components/inputs/single-select/single-select.component";
import { ButtonColor } from "src/enums/button-color/button-color";
import { useCurrencyHook } from "src/features/currency/hook/currency.hook";
import { useAPI } from "src/hooks/api/api.hook";
import { ModalWrapperProps } from "src/interfaces/modal/modal-wrapper-props.interface";
import { SelectedOption } from "src/types/other/selected-option.type";
import { isValidBillName } from "src/utils/validators/bill-name/bill-name.validator";
import { twJoin } from "tailwind-merge";

import { ModalWrapper } from "../../modal-wrapper.component";

export interface NewBillModalProps extends ModalWrapperProps {
  setOpen: (val: boolean) => void;
}

export const NewBillModal = ({
  setOpen,
  onRejected,
  ...wrapperProps
}: NewBillModalProps) => {
  const [currenciesOption, setCurrenciesOption] = useState<SelectedOption[]>(
    []
  );
  const [selectedCurrency, setSelectedCurrency] = useState<string | undefined>(
    "USD"
  );
  const [billName, setBillName] = useState("");
  const { currencies } = useCurrencyHook();
  const { post } = useAPI();
  const navigate = useNavigate();

  useEffect(() => {
    setCurrenciesOption(
      currencies.map<SelectedOption>((item) => {
        return { id: item.code, value: item.name };
      })
    );
  }, [currencies]);

  const renderRowElement = (data: SelectedOption, isChecked: boolean) => (
    <li
      className={twJoin(
        "h-[60px] flex items-center select-none duration-150 cursor-pointer truncate",
        isChecked
          ? "bg-slate-100 hover:bg-slate-200"
          : "bg-white hover:bg-slate-150 "
      )}
    >
      <Checkbox checked={isChecked} className="ml-2" />
      <div className="ml-2 flex flex-col">
        <div className="text-lg font-semibold">{data.id}</div>
        <div className="text-sm text-slate-600">{data.value}</div>
      </div>
    </li>
  );

  const postNewBill = () => {
    post<{ id: string }>({
      body: {
        name: billName,
        currencyCode: selectedCurrency,
      },
      url: "/bill",
      onSuccess: (result) => {
        navigate(`/bill/${result.id}`);
      },
      onFinally: () => {
        setOpen(false);
        setSelectedCurrency("USD");
        setBillName("");
      },
    });
  };

  return (
    <ModalWrapper
      onRejected={() => {
        setSelectedCurrency("USD");
        setBillName("");
        if (onRejected) onRejected();
      }}
      {...wrapperProps}
    >
      <div className="flex flex-col gap-5 items-center">
        <h2 className="text-center text-3xl font-semibold">Create new bill</h2>
        <InputText
          label="Bill name"
          value={billName}
          error={!isValidBillName(billName) && billName.length !== 0}
          onChange={(e) => setBillName(e.target.value)}
        />
        <div className="w-3/4 flex flex-col gap-5">
          <SingleSelect
            rowHeight={60}
            options={currenciesOption}
            value={selectedCurrency}
            onChange={(val) => {
              setSelectedCurrency(val);
            }}
            label={selectedCurrency ? selectedCurrency : "Select currency"}
            rowElement={renderRowElement}
            button={{ className: "h-10 truncate", color: ButtonColor.PURPLE }}
            filter={(searchText, options) => {
              return options.filter(
                (item) =>
                  item.value.toUpperCase().includes(searchText.toUpperCase()) ||
                  item.id.toUpperCase().includes(searchText.toUpperCase())
              );
            }}
          />
          <Button
            text="Create bill"
            disabled={
              !selectedCurrency || billName.length > 32 || billName.length < 3
            }
            onClick={postNewBill}
          />
        </div>
      </div>
    </ModalWrapper>
  );
};
