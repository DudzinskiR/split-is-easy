import { ReactNode } from "react";
import BillIcon from "src/assets/bill-icon.svg?react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlinePayments } from "react-icons/md";
import { MdAccessTime } from "react-icons/md";

type StatisticData = {
  icon: ReactNode;
  value: string;
  name: string;
};

const color = "#2ab500";
const iconClassName = "h-24 w-24";

const statisticData: StatisticData[] = [
  {
    icon: <FaRegUser fill={color} className={iconClassName} />,
    value: "500+",
    name: "Users",
  },
  {
    icon: <BillIcon fill={color} className={iconClassName} />,
    value: "100+",
    name: "Bills",
  },
  {
    icon: <MdOutlinePayments fill={color} className={iconClassName} />,
    value: "1000+",
    name: "Payments",
  },
  {
    icon: <MdAccessTime fill={color} className={iconClassName} />,
    value: "A lot of",
    name: "Time saved",
  },
];

export const PublicHomeStatisticSegment = () => {
  return (
    <div className="grid grid-cols-4">
      {statisticData.map((item, index) => (
        <div
          key={index}
          className="flex flex-col justify-center items-center col-span-2 sm:col-span-1"
        >
          <div>{item.icon}</div>
          <div style={{ color: color }} className="text-5xl font-bold">
            {item.value}
          </div>
          <div style={{ color: color }} className="text-3xl">
            {item.name}
          </div>
        </div>
      ))}
    </div>
  );
};
