import { ReactNode, createContext } from "react";
import { PieChartProps } from "../interface/pie-chart.interface";

export type PieChartContextProps = Required<PieChartProps>;

export const PieChartContext = createContext<PieChartContextProps | undefined>(
  undefined
);

interface PieChartProviderProps {
  children: ReactNode;
  value: PieChartContextProps;
}

export const PieChartContextProvider = ({
  children,
  value,
}: PieChartProviderProps) => {
  return (
    <PieChartContext.Provider value={value}>
      {children}
    </PieChartContext.Provider>
  );
};

export default PieChartContextProvider;
