import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useTimers } from "src/hooks/timers/timers.hook";
import { twMerge } from "tailwind-merge";
import { Button } from "../button/button.component";

interface ExpandableBarProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  barElement?: React.ReactNode;
  isOpen?: boolean;
  onClick?: () => void;
  resizeCallback?: (height: number) => void;
  openDuration?: number;
}

export const ExpandableBar = ({
  children,
  barElement,
  className,
  isOpen,
  onClick,
  resizeCallback,
  openDuration = 150,
  ...otherProps
}: ExpandableBarProps) => {
  const [isLocalOpen, setLocalOpen] = useState(false);
  const [isExpanded, setExpanded] = useState(false);
  const [isChildVisible, setChildVisible] = useState(false);
  const { newTimer, clearAllTimers } = useTimers();
  const childrenRef = useRef<HTMLDivElement | null>(null);

  const onClickHandler = () => {
    setLocalOpen((prev) => !prev);
    if (onClick) onClick();
  };

  useEffect(() => {
    clearAllTimers();
    if (isLocalOpen) {
      setChildVisible(true);
      newTimer(() => setExpanded(true), 50);
      newTimer(() => {
        if (resizeCallback)
          resizeCallback(childrenRef.current?.clientHeight || 0);
      }, 50);
    } else {
      setExpanded(false);
      newTimer(() => setChildVisible(false), openDuration);
      newTimer(() => {
        if (resizeCallback) resizeCallback(0);
      }, 0);
    }

    return () => {
      clearAllTimers();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLocalOpen]);

  useEffect(() => {
    setLocalOpen(!!isOpen);
  }, [isOpen]);

  return (
    <div
      className={twMerge("w-full flex flex-col items-center", className)}
      {...otherProps}
    >
      <div
        className={twMerge(
          "w-full h-12 rounded-xl shadow flex items-center duration-300 relative z-1",
          isLocalOpen && children
            ? "bg-slate-200"
            : "bg-slate-100 hover:bg-slate-150",
          children || onClick ? "cursor-pointer" : "cursor-auto"
        )}
        onClick={onClickHandler}
      >
        <div
          className={twMerge(
            children ? "w-[calc(100%-35px)]" : "w-full",
            "flex flex-row justify-between px-2"
          )}
        >
          {barElement}
        </div>
        {children && (
          <Button
            rounded
            icons={{
              center: isLocalOpen ? <IoIosArrowUp /> : <IoIosArrowDown />,
            }}
            className="w-[30px] h-[30px] text-[5px] mr-2"
          />
        )}
      </div>
      <div className="w-full flex justify-center">
        {children && isChildVisible && (
          <div
            className={twMerge(
              "w-11/12 bg-slate-100 rounded-b-lg grid",
              isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            )}
            style={{ transitionDuration: `${openDuration}ms` }}
          >
            <section className="overflow-hidden">
              <div ref={childrenRef}>{children}</div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};
