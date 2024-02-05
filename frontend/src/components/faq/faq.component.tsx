import { FAQRow } from "./faq-row/faq-row.component";

interface FAQProps {
  data: FAQData[];
}

export type FAQData = {
  question: string;
  answer: string;
};

export const FAQ = ({ data }: FAQProps) => {
  return (
    <div className="px-5">
      <ul className="w-full border-4 border-slate-400 rounded-lg">
        {data.map((item, index) => (
          <FAQRow key={index} question={item.question} answer={item.answer} />
        ))}
      </ul>
    </div>
  );
};
