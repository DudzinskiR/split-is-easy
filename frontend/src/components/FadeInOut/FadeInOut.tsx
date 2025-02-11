import { CSSProperties, ReactNode, useEffect, useState } from "react";
import { useTimers } from "src/hooks/newTimer/newTimer";
import { useRefHeight } from "src/hooks/useRefHeight/useRefHeight";
import { twMerge } from "tailwind-merge";

interface FadeInOutProps extends React.HTMLAttributes<HTMLElement> {
  children: ReactNode;
  transitionDuration?: number;
  isOpen: boolean;
  adjustHeight?: boolean;
}

export const FadeInOut = ({
  children,
  isOpen,
  transitionDuration = 150,
  className,
  adjustHeight,
  ...otherProps
}: FadeInOutProps) => {
  const [isLocalOpen, setLocalOpen] = useState(false);
  const { newTimer, clearAllTimers } = useTimers();
  const { height, ref } = useRefHeight();

  useEffect(() => {
    if (isOpen) {
      newTimer(() => {
        setLocalOpen(true);
      }, 0);
    } else {
      newTimer(() => {
        setLocalOpen(false);
      }, transitionDuration);
    }

    return () => clearAllTimers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const getStyles = (): CSSProperties => {
    const styles: CSSProperties = {};
    styles.transitionDuration = `${transitionDuration}ms`;
    if (adjustHeight) {
      styles.height = `${isOpen && isLocalOpen ? height : 0}px`;
    }
    return styles;
  };

  if (isOpen || isLocalOpen) {
    return (
      <div
        className={twMerge(
          isOpen && isLocalOpen ? "" : "opacity-0 scale-0 pointer-events-none"
        )}
        style={getStyles()}
        {...otherProps}
      >
        <div ref={ref} className={twMerge("relative", className)}>
          {children}
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};
