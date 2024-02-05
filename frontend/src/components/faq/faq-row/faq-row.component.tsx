import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { twJoin } from "tailwind-merge";
interface FAQRowProps {
  question: string;
  answer: string;
}

export const FAQRow = ({ question, answer }: FAQRowProps) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <li
      className={twJoin(
        "flex flex-col justify-center first:rounded-t-lg last:rounded-b-lg text-lg font-medium cursor-pointer py-5",
        "odd:bg-white hover:odd:bg-slate-50 even:bg-slate-100 hover:even:bg-slate-150 duration-150"
      )}
      onClick={() => setOpen((prev) => !prev)}
    >
      <div className="flex flex-row justify-between">
        <div className="pl-5 text-xl font-semibold">{question}</div>
        <div className="mr-10 text-2xl">
          {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
      </div>
      {isOpen && <div className="pl-5 mt-3">{answer}</div>}
    </li>
  );
};
