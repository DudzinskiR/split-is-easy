import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/features/store";
import { useGlobalFlagContext } from "src/hooks/useGlobalFlagContext/useGlobalFlagContext";
import { Currency } from "src/types/currency/Currency";
import { API } from "src/utils/api/api";

import { setCurrencies } from "../currencySlice";

export const useCurrencyHook = () => {
  const dispatch = useDispatch();
  const currencies = useSelector(
    (state: RootState) => state.currency.currencies
  );
  const { setFlag, getFlag } = useGlobalFlagContext();

  useEffect(() => {
    const fetchCurrencies = async () => {
      setFlag("CURRENCY", "FETCHING");
      try {
        const res = await API.get<Currency[]>("/p/currency");
        setFlag("CURRENCY", "FETCHED");

        if (res) {
          dispatch(setCurrencies(res));
        }
      } catch (e) {
        console.error(e);
      }
    };

    if (!getFlag("CURRENCY")) {
      fetchCurrencies();
    }
  }, [dispatch, getFlag, setFlag]);

  const getCurrency = (currencyCode: string) => {
    return currencies.find((item) => item.code === currencyCode);
  };

  return { currencies, getCurrency };
};
