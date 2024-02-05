import {
  InputHTMLAttributes,
  ReactNode,
  useEffect,
  useId,
  useState,
} from "react";
import { InputTextState } from "src/enums";
import { twMerge } from "tailwind-merge";

export interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const getInputTextStyle = (state: InputTextState) => {
  switch (state) {
    case InputTextState.error:
      return "focus:border-red-500 focus:bg-red-100 border-red-400 bg-red-50";
    case InputTextState.normal:
      return "focus:border-sky-500 focus:bg-sky-50/10 border-sky-400";
    case InputTextState.ok:
      return "focus:border-lime-400 focus:bg-sky-50/10 border-lime-500";
  }
};

export const InputText = ({
  label,
  error,
  leftIcon,
  rightIcon,
  value,
  className,
  placeholder,
  ...props
}: InputTextProps) => {
  const [state, setState] = useState<InputTextState>(InputTextState.normal);
  const ID = useId();
  useEffect(() => {
    if (error) {
      setState(InputTextState.error);
      return;
    }

    if (value === "" || value === undefined) {
      setState(InputTextState.normal);
    } else {
      setState(InputTextState.ok);
    }
  }, [error, value]);

  return (
    <div className="relative w-full">
      {leftIcon && (
        <i className="absolute text-2xl h-full flex items-center pl-1 text-slate-800">
          {leftIcon}
        </i>
      )}
      <input
        id={ID}
        placeholder={placeholder || " "}
        className={twMerge(
          getInputTextStyle(state),
          leftIcon ? "pl-8" : "pl-2",
          rightIcon ? "pr-8" : "",
          "peer h-10 w-full border-b-4 placeholder:italic focus:outline-0 transition-all bg-transparent",
          className
        )}
        value={value}
        {...props}
      />
      {rightIcon && (
        <i className="absolute right-0 top-0 text-2xl h-full flex items-center pr-1 text-slate-800">
          {rightIcon}
        </i>
      )}
      {label && (
        <label
          htmlFor={ID}
          className={twMerge(
            "absolute pointer-events-none select-none transition-all",
            "left-0 -top-5 text-gray-600 text-sm",
            leftIcon ? "pl-8" : "pl-2",
            "peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-1.5 peer-focus:-top-5 peer-focus:text-gray-700 peer-focus:text-sm"
          )}
        >
          {label}
        </label>
      )}
    </div>
  );
};
