import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

interface props {
  text: string;
  icon: ReactNode;
  to?: string;
  onClick?: () => void;
}

const buttonStyle =
  "h-10 bg-slate-700 hover:bg-slate-600 duration-150 rounded flex items-center text-slate-50";

const ButtonContent = ({ text, icon }: props) => (
  <>
    <div className="text-xl pl-1">{icon}</div>
    <div className="pl-1 truncate font-semibold">{text}</div>
  </>
);

const ButtonWithLink = ({ text, icon, to, onClick }: props) => {
  return (
    <Link className={buttonStyle} to={to!} onClick={onClick}>
      <ButtonContent text={text} icon={icon} />
    </Link>
  );
};

const ButtonWithCallback = ({ text, icon, onClick }: props) => {
  return (
    <div className={twMerge(buttonStyle, "cursor-pointer")} onClick={onClick}>
      <ButtonContent text={text} icon={icon} />
    </div>
  );
};

export const UserMenuButton = ({ to, ...props }: props) => {
  if (to) {
    return <ButtonWithLink to={to} {...props} />;
  } else {
    return <ButtonWithCallback {...props} />;
  }
};
