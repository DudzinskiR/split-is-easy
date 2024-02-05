import { ReactNode, createContext } from "react";
import { DropdownProps } from "../dropdown.component";

export const DropdownContext = createContext<DropdownProps | undefined>(
  undefined
);

interface DropdownProviderProps {
  children: ReactNode;
  value: DropdownProps;
}

export const DropdownContextProvider = ({
  children,
  value,
}: DropdownProviderProps) => {
  return (
    <DropdownContext.Provider value={value}>
      {children}
    </DropdownContext.Provider>
  );
};

export default DropdownContextProvider;
