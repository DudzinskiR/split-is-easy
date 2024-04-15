import { ReactNode } from "react";
import BillManagement from "src/assets/bill-management.svg?react";
import CustomSplit from "src/assets/custom-split.svg?react";
import HistoryIcon from "src/assets/history-icon.svg?react";
import SplitIcon from "src/assets/split-icon.svg?react";
import { PROJECT_NAME } from "src/utils/const";

export const AboutSegment = () => {
  const renderCategory = (text: string, icon: ReactNode) => {
    return (
      <div className="flex flex-col items-center justify-center mt-5 md:border-l-2 md:first:border-l-0 group">
        <div className="text-6xl text-[#2c62f5] group-hover:scale-125 duration-500">
          {icon}
        </div>
        <div className="mt-5 text-lg text-slate-700 italic group-hover:font-semibold duration-500">
          {text}
        </div>
      </div>
    );
  };

  return (
    <div className="py-10 w-full bg-white flex flex-col justify-center items-center">
      <div className="max-w-7xl w-full flex flex-col justify-center items-center ">
        <div className="text-4xl flex justify-center font-semibold text-indigo-700 text-center">
          About {PROJECT_NAME}
        </div>
        <div className="w-full sm:w-3/4 lg:w-2/3 mt-10">
          <div className="w-full grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4">
            {renderCategory(
              "Quick split",
              <SplitIcon className="size-[50px]" />
            )}
            {renderCategory(
              "Payment history",
              <HistoryIcon className="size-[50px]" />
            )}
            {renderCategory(
              "Custom split",
              <CustomSplit className="size-[50px]" />
            )}
            {renderCategory(
              "Bill management",
              <BillManagement className="size-[50px]" />
            )}
          </div>
          <hr className="h-[10px] mt-3 border-b-2 border-0" />
          <div className="text-center text-2xl mt-5 text-slate-700">
            We help you share your bills
          </div>
        </div>
      </div>
    </div>
  );
};
