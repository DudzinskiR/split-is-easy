import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

import PieChartCenterLabel from "./components/PieChartCenterLabel/PieChartCenterLabel";
import PieChartSegment from "./components/PieChartSegment/PieChartSegment";
import { PieChartShadow } from "./components/shadow/pie-chart-shadow.component";
import PieChartContextProvider from "./context/PieChartContext";
import { getSegmentColor } from "./helpers/getSegmentColor/getSegmentColor";
import { prepareChartData } from "./helpers/prepareChartData/prepareChartData";
import { PieChartProps } from "./interface/PieChartProps";
import { SegmentData } from "./interface/SegmentData";

const PieChart = ({
  data,
  maxSegment = 5,
  size = 220,
  minAngle = 30,
  maxLabelWidth = 100,
  className = "",
  currencyCode = "",
}: PieChartProps) => {
  const [segmentData, setSegmentData] = useState<SegmentData[]>([]);
  const [sum, setSum] = useState(0);
  useEffect(() => {
    const segments = prepareChartData(data, maxSegment, minAngle);

    if (segments[segments.length - 1].label === "") {
      segments[segments.length - 1].label = `Other (${
        data.length - maxSegment + 1
      })`;
    }

    setSegmentData(segments);
    setSum(data.reduce((acc, curr) => (acc += curr.value), 0));
  }, [data, maxSegment, minAngle]);

  let currentAngle = 0;
  let previousAngle = 0;

  return (
    <PieChartContextProvider
      value={{
        data,
        maxSegment,
        size,
        minAngle,
        maxLabelWidth,
        className,
        currencyCode,
      }}
    >
      <div
        className={twMerge("relative", className)}
        style={{
          height: `${size * 1.05}px`,
          width: `${size * 1.05}px`,
        }}
      >
        <PieChartShadow />
        {segmentData.map((item, index) => {
          previousAngle = currentAngle;
          currentAngle += item.angle;
          return (
            <PieChartSegment
              key={index}
              data={item}
              angle={previousAngle}
              color={getSegmentColor(index, sum)}
            />
          );
        })}
        <PieChartCenterLabel sum={sum} />
      </div>
    </PieChartContextProvider>
  );
};

export default PieChart;
