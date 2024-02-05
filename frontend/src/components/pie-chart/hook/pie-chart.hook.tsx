import { useContext } from "react";
import { PieChartContext } from "../context/pie-chart.context";

export const usePieChartContext = () => {
  const context = useContext(PieChartContext);
  if (!context) {
    throw new Error(
      "usePieChartContext must by used within a PieChartContextProvider"
    );
  }

  return context;
};
