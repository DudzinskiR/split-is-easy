import { PieChartData } from "./pie-chart-data.interface";

export interface PieChartProps {
  data: PieChartData[];
  maxSegment?: number;
  size?: number;
  minAngle?: number;
  className?: string;
  maxLabelWidth?: number;
  currencyCode?: string;
}
