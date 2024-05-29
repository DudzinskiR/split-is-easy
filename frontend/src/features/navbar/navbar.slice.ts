import { NavbarCategory } from "src/types/navbar/navbar-category.type";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { revertAll } from "../revert-all";

interface State {
  isNavbarOpen: boolean;
  navbarList: NavbarCategory[];
}
const initialState: State = { isNavbarOpen: false, navbarList: [] };

export const navbarSlice = createSlice({
  name: "NAVBAR",
  initialState,
  extraReducers: (builder) => builder.addCase(revertAll, () => initialState),
  reducers: {
    setNavbarOpen: (state, action: PayloadAction<boolean>) => {
      state.isNavbarOpen = action.payload;
    },
    toggleNavbarOpen: (state) => {
      state.isNavbarOpen = !state.isNavbarOpen;
    },
    setNavbarList: (state, action) => {
      state.navbarList = action.payload;
    },
  },
});

export const { setNavbarOpen, toggleNavbarOpen, setNavbarList } =
  navbarSlice.actions;
