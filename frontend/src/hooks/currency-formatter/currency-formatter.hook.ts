import { useEffect, useState } from "react";
import { CurrencyMode } from "src/enums/currency-mode/currency-mode";
import { useCurrencyHook } from "src/features/currency/hook/currency.hook";
import { Currency } from "src/types/currency/currency.type";

import { useNumberFormatter } from "../number-formatter/number-formatter.hook";

export const useCurrencyFormatter = (config?: {
  currencyCode?: string;
  mode?: CurrencyMode;
}) => {
  const [currency, setCurrency] = useState<Currency>();
  const [mode, setMode] = useState(
    config ? config.mode : CurrencyMode.SymbolFirst
  );
  const { shortenNumber } = useNumberFormatter();
  const { getCurrency } = useCurrencyHook();

  useEffect(() => {
    if (config && config.currencyCode)
      setCurrency(getCurrency(config.currencyCode));
  }, [config, getCurrency]);

  const currencyWithFormat = (value: number, config?: CurrencyMode) => {
    const isNegative = value < 0;
    const valueToShow = parseFloat(calcValue(Math.abs(value)));
    const formatterMode = config ? config : mode;

    switch (formatterMode) {
      case CurrencyMode.SymbolFirst:
        return `${isNegative ? "-" : ""}${getSymbol()}${shortenNumber(
          valueToShow
        )}`;
      case CurrencyMode.ValueFirst:
        return `${isNegative ? "-" : ""}${shortenNumber(
          valueToShow
        )} ${getSymbol()}`;
      case CurrencyMode.WithoutSymbol:
        return `${isNegative ? "-" : ""}${shortenNumber(valueToShow)}`;
    }
  };

  const currencyWithoutFormat = (value: number, config?: CurrencyMode) => {
    const isNegative = value < 0;
    const valueToShow = calcValue(Math.abs(value));
    const formatterMode = config ? config : mode;

    switch (formatterMode) {
      case CurrencyMode.SymbolFirst:
        return `${isNegative ? "-" : ""}${getSymbol()}${valueToShow}`;
      case CurrencyMode.ValueFirst:
        return `${isNegative ? "-" : ""}${valueToShow} ${getSymbol()}`;
      case CurrencyMode.WithoutSymbol:
        return `${isNegative ? "-" : ""}${valueToShow}`;
    }
  };

  const getSymbol = () => {
    return currency?.symbol || "";
  };

  const setCurrencyCode = (currencyCode: string) => {
    setCurrency(getCurrency(currencyCode));
  };
  const calcValue = (value: number) => {
    const divider = 10 ** (currency?.decimalDigits || 0);
    return (value / divider).toFixed(currency?.decimalDigits || 0);
  };

  const getCurrencyCode = () => {
    return currency?.code;
  };

  return {
    currencyWithFormat,
    currencyWithoutFormat,
    setCurrencyCode,
    setMode,
    getCurrencyCode,
  };
};
