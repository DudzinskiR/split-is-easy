import { FaMoneyBillWave } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import { RiMailSendLine } from "react-icons/ri";
import { useFadeInOnVisible } from "src/hooks/useFadeInOnVisible/useFadeInOnVisible";
import { twJoin } from "tailwind-merge";

import { WorkBox } from "./components/WorkBox";

export const WorkSection = () => {
  const { ref, isVisible } = useFadeInOnVisible({ timeout: 50, offset: -100 });
  return (
    <div className="w-full bg-[#070818] py-[80px] flex justify-center">
      <div className="relative max-w-7xl w-full h-full">
        <div
          className={twJoin(
            "duration-1000",
            isVisible ? "opacity-100 top-0" : "opacity-0 top-10"
          )}
          ref={ref}
        >
          <div className="text-white text-center text-5xl">How it works</div>
          <div className="text-gray-300 text-center text-lg mt-5">
            These three steps are enough to share your expenses without
            limitations
          </div>
        </div>

        <div className="flex lg:flex-row flex-col justify-between pt-10 gap-10 px-5">
          <WorkBox
            title="Log in"
            subtitle="First, log in. If you don't have an account, you can create one for free!"
            icon={<FiLogIn />}
            colors={"text-[#1362b3] border-[#1362b3]"}
            fadeInTimeout={100}
          />

          <WorkBox
            title="Create a new bill"
            subtitle='After logging in, create an account by clicking the "New Bill" button'
            icon={<FaMoneyBillWave />}
            colors={"text-[#b42b64] border-[#b42b64]"}
            fadeInTimeout={400}
          />

          <WorkBox
            title="Invite your group"
            subtitle="The final step is to invite your group by sending them an invitation link"
            icon={<RiMailSendLine />}
            colors={"text-[#ed7847] border-[#ed7847]"}
            fadeInTimeout={700}
          />
        </div>
      </div>
    </div>
  );
};
