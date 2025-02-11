import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { accountSlice } from "./account/accountSlice";
import { billsSlice } from "./bills/billsSlice";
import { currencySlice } from "./currency/currencySlice";
import { navbarSlice } from "./navbar/navbarSlice";
import { usersSlice } from "./users/usersSlice";
import { visibilitySlice } from "./visibility/visibilitySlice";

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
