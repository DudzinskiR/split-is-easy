import { twJoin } from "tailwind-merge";

interface HomeTitleProps {
  color: "WHITE" | "COLOR";
  text: string;
}

export const HomeTitle = ({ color, text }: HomeTitleProps) => {
  return (
    <div
      className={twJoin(
        "text-4xl flex justify-center font-semibold text-center border-4 p-4 duration-300",
        color === "WHITE"
          ? "text-white border-white hover:bg-white hover:text-indigo-700"
          : "text-indigo-700 border-indigo-700 hover:bg-indigo-700 hover:text-white"
      )}
    >
      {text}
    </div>
  );
};
