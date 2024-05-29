import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { accountSlice } from "./account/account.slice";
import { billsSlice } from "./bills/bill.slice";
import { currencySlice } from "./currency/currency";
import { navbarSlice } from "./navbar/navbar.slice";
import { usersSlice } from "./users/user.slice";
import { visibilitySlice } from "./visibility/visibility.slice";

const rootReducer = combineReducers({
  account: accountSlice.reducer,
  bills: billsSlice.reducer,
  currency: currencySlice.reducer,
  navbar: navbarSlice.reducer,
  users: usersSlice.reducer,
  visibility: visibilitySlice.reducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({ reducer: rootReducer, preloadedState });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
