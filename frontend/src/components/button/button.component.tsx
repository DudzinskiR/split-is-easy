import { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";
import { ButtonColor } from "src/enums/button-color/button-color";
import { twMerge } from "tailwind-merge";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  color?: ButtonColor | string;
  rounded?: boolean;
  icons?: ButtonIcons;
  to?: string;
}

interface ButtonIcons {
  left?: ReactNode;
  center?: ReactNode;
  right?: ReactNode;
}

export const Button = ({
  text,
  color,
  rounded,
  icons,
  className,
  disabled,
  to,
  ...props
}: ButtonProps) => {
  const renderButton = () => {
    return (
      <button
        className={twMerge(
          disabled
            ? "saturate-0 cursor-default"
            : "cursor-pointer hover:saturate-[1.5] duration-100",
          rounded ? "rounded-full" : "rounded-lg",
          "flex justify-center gap-2 items-center shadow-md text-white font-semibold select-none p-3 no-underline w-full",
          color || ButtonColor.BLUE,
          to ? "" : className
        )}
        disabled={disabled}
        {...props}
      >
        {icons?.left && (
          <div className="text-2xl pointer-events-none">{icons?.left}</div>
        )}

        {icons?.center && (
          <div className="text-2xl pointer-events-none">{icons?.center}</div>
        )}

        <div className={twMerge(icons?.center ? "hidden" : "block truncate")}>
          {text || "button"}
        </div>

        {icons?.right && (
          <div className="text-2xl pointer-events-none">{icons?.right}</div>
        )}
      </button>
    );
  };

  return (
    <>
      {to ? (
        <Link className={className} to={to}>
          {renderButton()}
        </Link>
      ) : (
        renderButton()
      )}
    </>
  );
};
