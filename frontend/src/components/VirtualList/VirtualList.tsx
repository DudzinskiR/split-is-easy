import { CSSProperties, ReactNode, useCallback, useState } from "react";
import { useExtraHight } from "src/hooks/useExtraHight/useExtraHight";
import { ExtraHeight } from "src/types/other/ExtraHeight";
import { twMerge } from "tailwind-merge";

export interface VirtualListProps {
  rowElement: (index: number, style: CSSProperties) => ReactNode;
  className?: string;
  height: number;
  itemCount: number;
  itemHeight: number;
  overscanCount?: number;
  extraHeight?: ExtraHeight[];
  transitionDuration?: number;
}

export const VirtualList = ({
  rowElement,
  className,
  itemCount,
  height,
  itemHeight,
  overscanCount = 5,
  extraHeight,
  transitionDuration = 150,
}: VirtualListProps) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const { calcExtraHeight } = useExtraHight(extraHeight);

  const renderRows = () => {
    const currentIndex = calcCurrentIndex();
    const startIndex = Math.max(currentIndex - overscanCount, 0);
    const visibleChildren = Math.floor(height / itemHeight);
    const endIndex =
      Math.min(overscanCount, currentIndex - startIndex) +
      startIndex +
      visibleChildren +
      overscanCount;

    const rowCount = Math.min(endIndex, itemCount) - startIndex;

    return Array.from({ length: rowCount }).map((_, index) => {
      return rowElement(index + startIndex, getRowStyle(index + startIndex));
    });
  };

  const calcCurrentIndex = () => {
    if (!extraHeight) {
      return Math.floor(scrollPosition / itemHeight);
    }

    let position = scrollPosition;
    let previousIndex = 0;

    for (const item of extraHeight) {
      if (Math.floor(position / itemHeight) < item.index) break;

      previousIndex = item.index;
      position -= item.height;
    }

    const adjustedPosition =
      previousIndex * itemHeight - calcExtraHeight(previousIndex);
    const index = Math.floor(Math.max(position, adjustedPosition) / itemHeight);

    return index;
  };

  const getRowStyle = useCallback(
    (index: number): React.CSSProperties => {
      return {
        position: "absolute",
        top: `${index * itemHeight + calcExtraHeight(index)}px`,
        width: "100%",
        transitionDuration: `${transitionDuration}ms`,
      };
    },
    [transitionDuration, itemHeight, calcExtraHeight]
  );

  const onScroll = (event: React.UIEvent<HTMLElement>) => {
    const scrollTop = event.currentTarget.scrollTop;
    setScrollPosition(scrollTop);
  };

  return (
    <div
      className={twMerge("h-full w-full overflow-auto", className)}
      onScroll={onScroll}
      style={{ height: `${height}px` }}
    >
      <ul
        className="relative"
        style={{
          height: `${itemCount * itemHeight + calcExtraHeight()}px`,
        }}
      >
        {renderRows()}
      </ul>
    </div>
  );
};
