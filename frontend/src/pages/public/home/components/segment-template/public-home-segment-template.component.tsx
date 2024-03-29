import { ReactNode } from "react";
import { twJoin } from "tailwind-merge";

interface PublicHomeSegmentTemplateProps {
  whiteBackground: boolean;
  children: ReactNode;
  fullScreen?: boolean;
}

export const PublicHomeSegmentTemplate = ({
  whiteBackground,
  children,
  fullScreen,
}: PublicHomeSegmentTemplateProps) => {
  return (
    <div
      className={twJoin(
        "w-full flex justify-center",
        whiteBackground ? "bg-white" : "bg-slate-50"
      )}
    >
      {fullScreen ? (
        <>{children}</>
      ) : (
        <div className={"max-w-7xl w-screen my-5 py-2"}>{children}</div>
      )}
    </div>
  );
};
