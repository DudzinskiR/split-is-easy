import { createContext, Dispatch, ReactNode } from "react";

import { newPaymentInitValues } from "../const/NewPaymentInitValue";
import { NewPaymentAction } from "../reducer/NewPaymentReducer";

export interface NewPaymentState {
  state: typeof newPaymentInitValues;
  dispatch: Dispatch<NewPaymentAction>;
}

export const NewPaymentContext = createContext<NewPaymentState | undefined>(
  undefined
);

interface NewPaymentProviderProps {
  children: ReactNode;
  state: typeof newPaymentInitValues;
  dispatch: Dispatch<NewPaymentAction>;
}

export const NewPaymentContextProvider = ({
  children,
  state,
  dispatch,
}: NewPaymentProviderProps) => {
  return (
    <NewPaymentContext.Provider value={{ state, dispatch }}>
      {children}
    </NewPaymentContext.Provider>
  );
};
