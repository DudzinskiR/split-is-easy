import { ReactNode } from "react";
import { FiLogIn } from "react-icons/fi";
import { FaMoneyBillWave } from "react-icons/fa";
import { RiMailSendLine } from "react-icons/ri";
import { HomeTitle } from "../../home-title";
export const HowAppWorkSegment = () => {
  const renderBox = (title: string, subtitle: string, icon: ReactNode) => {
    return (
      <div className="group relative w-full py-7 bg-slate-50 border-2 shadow-lg rounded-md">
        <div className="w-full flex justify-center text-5xl text-indigo-600">
          {icon}
        </div>
        <div className="absolute bottom-2 left-5 rotate-[-15deg] group-hover:rotate-0 text-8xl text-slate-800 opacity-[0.05] duration-300">
          {icon}
        </div>
        <div className="relative text-center mt-3 text-2xl text-slate-700 font-medium z-100">
          {title}
        </div>
        <div className="text-center text-lg mt-3 px-3 text-slate-700">
          {subtitle}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full bg-white py-10 flex justify-center">
      <div className="max-w-7xl w-full flex flex-col justify-center items-center">
        <div className="w-">
          <HomeTitle color={"COLOR"} text={"How it work"} />
        </div>
        <div className="text-center text-2xl mt-5 text-slate-700">
          These three steps are enough to share your expenses without
          limitations
        </div>
        <div className="flex justify-center mt-10">
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-10 w-full px-5">
            {renderBox(
              "log in",
              "The first step is to log in. If you don't have an account yet, you can create one for free!",
              <FiLogIn />
            )}
            {renderBox(
              "create a new bill",
              'After logging in, create an account by clicking the "New Bill" button',
              <FaMoneyBillWave />
            )}
            {renderBox(
              "invite your group",
              "The final step is inviting your group to the account. You can do this by sending them an invitation link",
              <RiMailSendLine />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
