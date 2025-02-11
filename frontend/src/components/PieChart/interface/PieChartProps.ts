import { PieChartData } from "./PieChartData";

export interface PieChartProps {
  data: PieChartData[];
  maxSegment?: number;
  size?: number;
  minAngle?: number;
  className?: string;
  maxLabelWidth?: number;
  currencyCode?: string;
}
