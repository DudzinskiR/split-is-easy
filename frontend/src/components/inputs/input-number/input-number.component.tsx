import { ChangeEvent, InputHTMLAttributes, useId, useState } from "react";
import { ButtonColor } from "src/enums";
import { decimalRegex } from "src/utils/regex";
import { twJoin } from "tailwind-merge";

export interface InputNumberProps
  extends InputHTMLAttributes<HTMLInputElement> {
  symbol?: string;
  precision?: number;
  symbolSite?: "LEFT" | "RIGHT" | "NONE";
  maxValue?: number;
}

export const InputNumber = ({
  symbol,
  precision = 2,
  maxValue = 9999999,
  onChange,
  symbolSite = "LEFT",
  id,
  ...inputProps
}: InputNumberProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const ID = useId();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const regex = decimalRegex(precision);
    if (!regex.test(e.target.value)) return;

    e.target.value = e.target.value.replace(",", ".");
    if (Math.abs(parseFloat(e.target.value)) > maxValue) return;
    setInputValue(e.target.value);
    if (onChange) onChange(e);
  };

  const getSymbolClassName = () => {
    const className =
      "absolute h-full w-9 text-white flex justify-center items-center font-semibold shadow-lg select-none text-sm";

    switch (symbolSite) {
      case "LEFT":
        return twJoin(className, "left-0 rounded-s");
      case "RIGHT":
        return twJoin(className, "right-0 rounded-e");

      case "NONE":
        return "hidden";
    }
  };

  const getInputClassName = () => {
    const className =
      "border-2 border-indigo-700 w-full rounded shadow-inner outline-none py-px px-1 appearance-none";

    switch (symbolSite) {
      case "LEFT":
        return twJoin(className, "pl-10");
      case "RIGHT":
        return twJoin(className, "pr-10 appearance-none");
      case "NONE":
        return className;
    }
  };
  return (
    <div className="relative shadow rounded w-full">
      <label
        htmlFor={id ? id : ID}
        className={twJoin(getSymbolClassName(), ButtonColor.PURPLE)}
      >
        {symbol}
      </label>
      <input
        className={getInputClassName()}
        id={id ? id : ID}
        value={inputValue}
        {...inputProps}
        onChange={handleChange}
      />
    </div>
  );
};
