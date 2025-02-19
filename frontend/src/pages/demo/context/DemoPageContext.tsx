import { createContext, Dispatch, ReactNode } from "react";
import { DemoPageAction } from "../reducer/DemoPageReducer";
import { demoPageInitValues } from "../reducer/demoPageInitValues";

export interface DemoPageContextProps {
  state: typeof demoPageInitValues;
  dispatch: Dispatch<DemoPageAction>;
  openLoginModal: () => void;
}

export const DemoPageContext = createContext<DemoPageContextProps | undefined>(
  undefined
);

interface DemoPageProviderProps {
  children: ReactNode;
  state: typeof demoPageInitValues;
  dispatch: Dispatch<DemoPageAction>;
  openLoginModal: () => void;
}

export const DemoPageContextProvider = ({
  children,
  state,
  dispatch,
  openLoginModal,
}: DemoPageProviderProps) => {
  return (
    <DemoPageContext.Provider value={{ state, dispatch, openLoginModal }}>
      {children}
    </DemoPageContext.Provider>
  );
};

export default DemoPageContextProvider;
