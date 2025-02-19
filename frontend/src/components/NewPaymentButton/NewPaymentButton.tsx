import { ButtonHTMLAttributes } from "react";
import { FaPlus } from "react-icons/fa";
import { IoArrowRedo } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { ButtonColor } from "src/enums/ButtonColor/ButtonColor";
import { useBillsHook } from "src/features/bills/hook/useBillsHook";
import { useGlobalFlagContext } from "src/hooks/useGlobalFlagContext/useGlobalFlagContext";
import { twJoin } from "tailwind-merge";

interface NewPaymentButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const NewPaymentButton = ({ ...buttonProps }: NewPaymentButtonProps) => {
  const { billID } = useParams();
  const { getBillData } = useBillsHook();
  const { getFlag } = useGlobalFlagContext();
  const renderDescription = () => {
    if (getFlag(`${billID}/payments`) !== "FETCHED") return <></>;
    if (getBillData(billID)?.payments.length !== 0) return <></>;
    return (
      <div className="absolute right-[280px] top-[-10px] pointer-events-none">
        <div className="absolute text-xl truncate font-semibold text-slate-600 italic">
          Add your first payment
        </div>
        <div className="absolute left-[170px] top-[30px] text-3xl -scale-y-100 text-slate-600">
          <IoArrowRedo />
        </div>
      </div>
    );
  };

  return (
    <button
      className={twJoin(
        "fixed bottom-[72px] sm:right-[72px] right-[20px] w-[67px] h-[67px] sm:w-[72px] sm:h-[72px] rounded-full flex justify-center items-center duration-150",
        "shadow-[2.0px_3.0px_4.0px_rgba(0,0,0,0.23)]",
        "hover:saturate-[1.3]",
        ButtonColor.BLUE
      )}
      {...buttonProps}
    >
      {renderDescription()}
      <div className="text-white text-3xl">
        <FaPlus />
      </div>
    </button>
  );
};
