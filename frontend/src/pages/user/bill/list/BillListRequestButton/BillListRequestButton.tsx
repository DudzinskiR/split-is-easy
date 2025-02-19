import { Button } from "src/components/Button/Button";
import { ButtonColor } from "src/enums/ButtonColor/ButtonColor";
import { twJoin } from "tailwind-merge";

interface BillListRequestButtonProps {
  billName: string;
  onClick: () => void;
}

const BillListRequestButton = ({
  billName,
  onClick,
}: BillListRequestButtonProps) => {
  return (
    <div
      className={twJoin(
        "flex flex-row justify-around items-center w-full bg-white duration-150 ",
        "hover:bg-slate-50 hover:-translate-y-[2px] hover:shadow-md",
        "shadow rounded py-5 px-3 cursor-pointer"
      )}
      onClick={onClick}
    >
      <div className="text-xl w-full truncate">{billName}</div>
      <Button text="Cancel" className="w-1/4" color={ButtonColor.RED} />
    </div>
  );
};

export default BillListRequestButton;
