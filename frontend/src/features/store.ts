import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { accountSlice } from "./account";
import { billsSlice } from "./bills";
import { currencySlice } from "./currency";
import { navbarSlice } from "./navbar";
import { usersSlice } from "./users";
import { visibilitySlice } from "./visibility";

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
