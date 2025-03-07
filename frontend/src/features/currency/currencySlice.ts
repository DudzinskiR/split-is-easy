import { Currency } from "src/types/currency/Currency";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { revertAll } from "../revertAll";

const initialState = {
  currencies: [] as Currency[],
};

export const currencySlice = createSlice({
  name: "CURRENCIES",
  initialState: initialState,
  extraReducers: (builder) => builder.addCase(revertAll, () => initialState),
  reducers: {
    setCurrencies: (state, action: PayloadAction<Currency[]>) => {
      state.currencies = action.payload;
    },
  },
});

export const { setCurrencies } = currencySlice.actions;
