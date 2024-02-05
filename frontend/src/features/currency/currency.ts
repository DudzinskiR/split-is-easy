import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Currency } from "src/types";
import { revertAll } from "../revert-all";

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
