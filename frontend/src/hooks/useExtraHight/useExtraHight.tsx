import { useEffect, useState } from "react";
import { ExtraHeight } from "src/types/other/ExtraHeight";

export const useExtraHight = (extra?: ExtraHeight[]) => {
  const [extraHeights, setExtraHeights] = useState<ExtraHeight[]>([]);

  useEffect(() => {
    if (extra) {
      setExtraHeights(extra);
    }
  }, [extra]);

  const updateExtraHeight = (height: number, index: number) => {
    const element = extraHeights.find((item) => item.index === index);

    if (element) {
      setExtraHeights((prev) => {
        const newExtraHeight = [...prev];
        const element = newExtraHeight.find((item) => item.index === index);
        if (element) element.height = height;
        return newExtraHeight;
      });
    } else {
      setExtraHeights((prev) => {
        const newExtraHeight = [...prev, { height, index }];
        newExtraHeight.sort((a, b) => a.index - b.index);
        return newExtraHeight;
      });
    }
  };

  const toggleExtraHeight = (height: number, index: number) => {
    const element = extraHeights.find((item) => item.index === index);
    if (element) {
      setExtraHeights(extraHeights.filter((item) => item.index !== index));
    } else {
      setExtraHeights((prev) => {
        const newExtraHeight = [...prev, { height, index }];
        newExtraHeight.sort((a, b) => a.index - b.index);
        return newExtraHeight;
      });
    }
  };

  const getExtraHeights = () => {
    return extraHeights;
  };

  const calcExtraHeight = (index: number = Number.MAX_VALUE) => {
    const result = extraHeights.reduce<number>((acc, current) => {
      if (current.index < index) {
        return acc + current.height;
      }

      return acc;
    }, 0);

    return result;
  };

  const clearExtraHeight = () => {
    setExtraHeights([]);
  };

  return {
    toggleExtraHeight,
    getExtraHeights,
    calcExtraHeight,
    updateExtraHeight,
    clearExtraHeight,
  };
};
