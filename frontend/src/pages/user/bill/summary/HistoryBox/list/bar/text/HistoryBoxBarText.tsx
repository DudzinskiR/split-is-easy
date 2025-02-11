import { ReactNode } from "react";

interface HistoryBoxBarTextProps {
  children: ReactNode;
  title: string;
}

const HistoryBoxBarText = ({ children, title }: HistoryBoxBarTextProps) => {
  return (
    <div className="w-full">
      <div className="font-semibold text-slate-800 text-sm">{title}</div>
      <div className="text-xl">{children}</div>
    </div>
  );
};

export default HistoryBoxBarText;
