import { twJoin } from "tailwind-merge";
import { useEffect } from "react";
import { usePieChartContext } from "../../hook/pie-chart.hook";
import { useCurrencyFormatter } from "src/hooks/currency-formatter/currency-formatter.hook";

interface PieChartCenterLabelProps {
  sum: number;
}

const PieChartCenterLabel = ({ sum }: PieChartCenterLabelProps) => {
  const { size, currencyCode } = usePieChartContext();
  const { setCurrencyCode, currencyWithFormat } = useCurrencyFormatter();

  useEffect(() => {
    setCurrencyCode(currencyCode);
  }, [currencyCode, setCurrencyCode]);

  const getGradientStyle = () => {
    if (sum >= 0) {
      return "bg-gradient-to-b from-lime-500 to-green-700";
    } else {
      return "bg-gradient-to-b from-rose-500 to-red-700";
    }
  };

  const getDescription = () => {
    if (sum > 0) {
      return "You're owed";
    } else if (sum < 0) {
      return "You owe";
    } else {
      return "All settled";
    }
  };
  return (
    <div className="absolute w-full h-full flex justify-center items-center pointer-events-none">
      <div
        className="bg-white rounded-full flex justify-center items-center pointer-events-auto shadow-[10px_20px_65px_-10px_rgba(0,0,0,0.4)]"
        style={{
          height: `${size * 0.65}px`,
          width: `${size * 0.65}px`,
        }}
      >
        <div
          className={twJoin(
            "flex justify-center items-center  rounded-full shadow-xl hover:saturate-[1.2]",
            getGradientStyle()
          )}
          style={{
            height: `${size * 0.61}px`,
            width: `${size * 0.61}px`,
          }}
        >
          <div className="text-white font-bold text-center">
            <div className="text-xl p-1">{getDescription()}</div>
            {sum !== 0 && (
              <div className="text-xl font-extrabold p-1">
                {currencyWithFormat(Math.abs(sum))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PieChartCenterLabel;
