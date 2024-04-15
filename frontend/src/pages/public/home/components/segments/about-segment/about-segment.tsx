import { PROJECT_NAME } from "src/utils/const";
import { LuSplit } from "react-icons/lu";
import { GoHistory } from "react-icons/go";
import { MdModeEdit } from "react-icons/md";
import { FaMoneyBill } from "react-icons/fa";
import { ReactNode } from "react";
export const AboutSegment = () => {
  const renderCategory = (text: string, icon: ReactNode) => {
    return (
      <div className="flex flex-col items-center justify-center border-l-2 first:border-l-0 ">
        <div className="w-[50px] h-[50px] text-6xl text-[#2c62f5]">{icon}</div>
        <div className="mt-5 text-lg italic">{text}</div>
      </div>
    );
  };
  //linear-gradient(90deg, rgba(0,0,70,1) 0%, rgba(79,28,150,1) 33%, rgba(28,181,224,1) 100%)
  return (
    <div className="py-10 w-full bg-white flex flex-col justify-center items-center">
      <div className="text-4xl flex justify-center font-semibold">
        About {PROJECT_NAME}
      </div>
      <div className="w-2/3 mt-10">
        <div className="w-full grid grid-cols-4">
          {renderCategory("Quick split", <LuSplit />)}
          {renderCategory("Payment history", <GoHistory />)}
          {renderCategory("Custom split", <MdModeEdit />)}
          {renderCategory("Bill management", <FaMoneyBill />)}
        </div>
        <hr className="h-[10px] mt-3 border-b-2 border-0" />
        <div className="text-center text-2xl mt-5">
          We help you share your bills
        </div>
      </div>
    </div>
  );
};
