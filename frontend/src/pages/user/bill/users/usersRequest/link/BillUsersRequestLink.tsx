import { useState } from "react";
import { twJoin } from "tailwind-merge";

interface BillUsersRequestLinkProps {
  invCode: string | undefined;
}

const BillUsersRequestLink = ({ invCode }: BillUsersRequestLinkProps) => {
  const [isLinkClicked, setLinkClicked] = useState(false);
  const copyLink = () => {
    setLinkClicked(true);
    navigator.clipboard.writeText(`${window.location.origin}/inv/${invCode}`);
  };

  const renderLinkBox = () => {
    if (invCode) {
      return (
        <div className="sm:text-lg text-sm md:text-xl font-medium text-slate-800">
          {`${window.location.origin}/inv/${invCode}`}
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  };

  return (
    <>
      <div className="md:text-xl text-base">Invite your friends to bill</div>
      <button
        className={twJoin(
          "rounded-xl mx-1 sm:mx-5 border-2 w-11/12 border-dashed cursor-pointer my-3 duration-500",
          isLinkClicked
            ? "bg-green-50 border-green-500"
            : "bg-slate-50 border-slate-300"
        )}
        onClick={copyLink}
      >
        {renderLinkBox()}
        <div className="text-sm italic text-slate-800">
          {isLinkClicked ? "Copied" : "Click to copy"}
        </div>
      </button>
    </>
  );
};

export default BillUsersRequestLink;
