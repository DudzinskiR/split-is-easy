import { twJoin } from "tailwind-merge";
import createPolygon from "../../helpers/create-polygon/create-polygon.helper";
import { usePieChartContext } from "../../hook/pie-chart.hook";
import { SegmentData } from "../../interface/segment-data.interface";
import { PieChartSegmentLabel } from "../segment-label/pie-chart-segment-label.component";

export interface PieChartSegmentProps {
  data: SegmentData;
  angle: number;
  color: string;
}

const PieChartSegment = ({ data, angle, color }: PieChartSegmentProps) => {
  const { size } = usePieChartContext();
  return (
    <>
      {data.angle !== 360 && (
        <div className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">
          <div className="relative">
            <PieChartSegmentLabel data={data} currentAngle={angle} />
          </div>
        </div>
      )}
      <div
        className="absolute flex justify-center items-center"
        style={{
          clipPath: createPolygon(data.angle + 1),
          transform: `rotate(${angle}deg)`,
          height: `${size * 1.05}px`,
          width: `${size * 1.05}px`,
        }}
      >
        <div
          className={twJoin(
            `rounded-full hover:saturate-[1.75] duration-150`,
            color
          )}
          style={{
            height: `${size * 0.95}px`,
            width: `${size * 0.95}px`,
            transform: `rotate(${angle}deg)`,
          }}
        ></div>
      </div>
    </>
  );
};

export default PieChartSegment;
