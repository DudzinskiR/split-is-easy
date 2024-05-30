import { GoPeople } from "react-icons/go";
import { Link } from "react-router-dom";
import { twJoin } from "tailwind-merge";
import { useEffect } from "react";
import { useCurrencyFormatter } from "src/hooks/currency-formatter/currency-formatter.hook";
import { ButtonColor } from "src/enums/button-color/button-color";

interface BillListButtonProps {
  billName: string;
  usersNumber: number;
  billID: string;
  userBalance: number;
  currencyCode: string;
}

const BillListButton = ({
  billName,
  billID,
  userBalance,
  usersNumber,
  currencyCode,
}: BillListButtonProps) => {
  const { setCurrencyCode, currencyWithFormat } = useCurrencyFormatter();

  useEffect(() => {
    setCurrencyCode(currencyCode);
  }, [currencyCode, setCurrencyCode]);
  return (
    <Link
      to={`/bill/${billID}`}
      className={twJoin(
        "flex flex-col justify-around items-center w-full bg-white duration-150 ",
        "hover:bg-slate-50 hover:-translate-y-[2px] hover:shadow-md",
        "shadow rounded pt-2 cursor-pointer"
      )}
    >
      <div className="text-center line-clamp-2 text-base md:text-xl mx-5 duration-150 pb-2 font-medium text-slate-800">
        {billName}
      </div>
      <div className="w-9/12 border-b-2"></div>
      <div className="flex flex-row justify-around w-full py-3">
        <div className="flex flex-row items-center justify-center text-xl w-full">
          <GoPeople />x{usersNumber}
        </div>
        <div className="w-full flex flex-row justify-center mr-2">
          {userBalance !== 0 && (
            <div
              className={twJoin(
                "font-semibold text-lg h-10 flex items-center justify-center text-white px-5 rounded-lg w-36 shadow-md",
                userBalance > 0 ? ButtonColor.GREEN : ButtonColor.RED
              )}
            >
              {currencyWithFormat(userBalance)}
            </div>
          )}
          {userBalance === 0 && (
            <div
              className={twJoin(
                "font-semibold text-base sm:text-lg h-10 flex items-center justify-center text-white rounded-lg px-5 w-36 shadow-md",
                ButtonColor.GREEN
              )}
            >
              All settled
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default BillListButton;
