import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { revertAll } from "../revert-all";

const initialState = {
  IDs: [] as string[],
};

export const visibilitySlice = createSlice({
  name: "VISIBILITY",
  initialState: initialState,
  extraReducers: (builder) => builder.addCase(revertAll, () => initialState),
  reducers: {
    addNewID: (state, action: PayloadAction<string>) => {
      state.IDs = [...state.IDs, action.payload];
    },
    removeID: (state, action: PayloadAction<string>) => {
      state.IDs = state.IDs.filter((item) => item !== action.payload);
    },
    removeNewest: (state) => {
      state.IDs = state.IDs.slice(0, -1);
    },
  },
});

export const { addNewID, removeID, removeNewest } = visibilitySlice.actions;
