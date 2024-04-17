import { ReactNode, createContext } from "react";
import { Phone3DProps } from "../phone-3D.component";

export const Phone3DContext = createContext<Phone3DProps | undefined>(
  undefined
);

interface Phone3DProviderProps {
  children: ReactNode;
  value: Phone3DProps;
}

export const Phone3DContextProvider = ({
  children,
  value,
}: Phone3DProviderProps) => {
  return (
    <Phone3DContext.Provider value={value}>{children}</Phone3DContext.Provider>
  );
};
