import { useEffect, useState } from "react";
import { SegmentData } from "../../interface/segment-data.interface";
import { usePieChartContext } from "../../hook/pie-chart.hook";
import { useCurrencyFormatter } from "src/hooks/currency-formatter/currency-formatter.hook";
import { getSegmentLabelPosition } from "../../helpers/get-segment-label-position/get-segment-label-position";
import { getSegmentLabelStyle } from "../../helpers/get-segment-label-style/get-segment-label-style";

export interface PieChartSegmentLabelProps {
  data: SegmentData;
  currentAngle: number;
}

export const PieChartSegmentLabel = ({
  data,
  currentAngle,
}: PieChartSegmentLabelProps) => {
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const { size, maxLabelWidth, currencyCode } = usePieChartContext();
  const { currencyWithFormat, setCurrencyCode } = useCurrencyFormatter();

  useEffect(() => {
    const centerAngle = data.angle / 2;
    setPosition(() =>
      getSegmentLabelPosition(currentAngle + centerAngle, size, 1.1)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, size]);

  useEffect(() => {
    setCurrencyCode(currencyCode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currencyCode]);

  return (
    <>
      <div
        className="absolute z-5 select-none border-b-[1.5px] border-slate-400 border-spacing-2 font-semibold"
        style={getSegmentLabelStyle(position.x, position.y, maxLabelWidth)}
      >
        <div className="truncate">{data.label}</div>
        <div className="absolute flex justify-center w-full whitespace-nowrap">
          {currencyWithFormat(data.value)}
        </div>
      </div>
      <div
        className="absolute w-[225px] h-[1px] bg-slate-400 top-0 left-0 -z-50"
        style={{
          width: `${Math.sqrt(position.x ** 2 + position.y ** 2)}px`,
          transform: `rotate(${Math.atan2(position.y - 1, position.x - 1)}rad)`,
          transformOrigin: `0% 50%`,
        }}
      ></div>
    </>
  );
};
