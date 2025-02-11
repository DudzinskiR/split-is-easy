import { Background1 } from "src/assets/landing-page/background";
import { questions } from "./const/questions";
import { FaqRow } from "./components/FaqRow/FaqRow";

export const FaqSection = () => {
  return (
    <div className="relative bg-[#0e1129] flex justify-center overflow-hidden">
      <Background1 className="absolute left-0 top-0 scale-x-[-1]" />
      <Background1 className="absolute right-0 bottom-0 scale-y-[-1]" />

      <div className="relative max-w-7xl w-full flex flex-col gap-5 justify-center items-center my-10 mx-5">
        {questions.map((item, index) => (
          <div key={index} className="lg:w-[700px] w-full relative">
            <FaqRow
              question={`${index + 1}. ${item.question}`}
              answer={item.answer}
              isOpen={index === 1}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
