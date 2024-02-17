import { ReactNode } from "react";
import BillIcon from "src/assets/bill-icon.svg?react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlinePayments } from "react-icons/md";
import { MdAccessTime } from "react-icons/md";
import moneyBackground from "src/assets/money-background.jpg";
import { VisibleCountUp } from "src/components";

type StatisticData = (
  | {
      type: "STATIC";
      value: string | number;
    }
  | {
      type: "DYNAMIC";
      value: number;
      finalValue?: string;
    }
) & {
  icon: ReactNode;
  name: string;
};

const color = "#35e300";
const iconClassName = "h-24 w-24";

const statisticData: StatisticData[] = [
  {
    type: "DYNAMIC",
    icon: <FaRegUser fill={color} className={iconClassName} />,
    value: 500,
    finalValue: "500+",
    name: "Users",
  },
  {
    type: "DYNAMIC",
    icon: <BillIcon fill={color} className={iconClassName} />,
    value: 100,
    finalValue: "100+",
    name: "Bills",
  },
  {
    type: "DYNAMIC",
    icon: <MdOutlinePayments fill={color} className={iconClassName} />,
    value: 1000,
    finalValue: "1000+",
    name: "Payments",
  },
  {
    type: "STATIC",
    icon: <MdAccessTime fill={color} className={iconClassName} />,
    value: "A lot of",
    name: "Time saved",
  },
];

export const PublicHomeStatisticSegment = () => {
  return (
    <div className="relative w-full flex justify-center">
      <div
        className={`absolute w-full h-full top-0 py-5 bg-fixed bg-cover`}
        style={{ backgroundImage: `url(${moneyBackground})` }}
      />
      <div className="relative max-w-7xl w-screen my-5">
        <div className="grid grid-cols-4">
          {statisticData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col justify-center items-center col-span-2 sm:col-span-1"
            >
              <div>{item.icon}</div>
              <div style={{ color: color }} className="text-5xl font-bold">
                {item.type === "DYNAMIC" ? (
                  <VisibleCountUp
                    value={item.value}
                    finalValue={item.finalValue}
                  />
                ) : (
                  item.value
                )}
              </div>
              <div style={{ color: color }} className="text-3xl">
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
