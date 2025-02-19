import { usePieChartContext } from "../../hook/usePieChartContext";

export const PieChartShadow = () => {
  const { size } = usePieChartContext();
  return (
    <div
      className="absolute bg-transparent rounded-full absolute-center shadow-[0_15px_50px_-15px_rgba(0,0,0,0.5)]"
      style={{
        height: `${size * 0.95}px`,
        width: `${size * 0.95}px`,
      }}
    ></div>
  );
};
