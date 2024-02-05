import { ReactNode } from "react";
import { twJoin } from "tailwind-merge";

interface PublicHomeSegmentTemplateProps {
  whiteBackground: boolean;
  children: ReactNode;
}

export const PublicHomeSegmentTemplate = ({
  whiteBackground,
  children,
}: PublicHomeSegmentTemplateProps) => {
  return (
    <div
      className={twJoin(
        "w-full flex justify-center",
        whiteBackground ? "bg-white" : "bg-slate-50"
      )}
    >
      <div className={"max-w-7xl w-screen my-5"}>{children}</div>
    </div>
  );
};
