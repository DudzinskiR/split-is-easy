import { useState } from "react";
import { twJoin } from "tailwind-merge";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
export interface FaqRowProps {
  question: string;
  answer: string;
  isOpen?: boolean;
}

export const FaqRow = ({ question, answer, isOpen = false }: FaqRowProps) => {
  const [isLocalOpen, setLocalOpen] = useState(isOpen);

  return (
    <div className="w-full bg-white rounded-lg cursor-pointer">
      <div
        className={twJoin(
          "flex py-3 items-center pl-5 duration-100 text-lg font-medium",
          isLocalOpen
            ? "border-b-2 border-slate-300 text-indigo-500"
            : " text-slate-700"
        )}
        onClick={() => setLocalOpen((prev) => !prev)}
      >
        {question}
        <div className="absolute right-4 top-5">
          {isLocalOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
      </div>
      <div
        className={`overflow-hidden duration-300 h-full text-lg  ${
          isLocalOpen ? "max-h-[150px]" : "max-h-0"
        }`}
      >
        <div className="p-3 text-black">{answer}</div>
      </div>
    </div>
  );
};
