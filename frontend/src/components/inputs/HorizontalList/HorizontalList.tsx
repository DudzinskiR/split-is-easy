import { SelectedOption } from "src/types/other/SelectedOption";
import { twMerge } from "tailwind-merge";

import HorizontalListButton from "./HorizontalListButton/HorizontalListButton";

interface HorizontalListProps {
  options: SelectedOption[];
  value: string;
  className?: string;
  onClick: (val: string) => void;
}

export const HorizontalList = ({
  options,
  value,
  className,
  onClick,
}: HorizontalListProps) => {
  return (
    <div className={twMerge("flex flex-row", className)}>
      {options.map((item) => {
        return (
          <HorizontalListButton
            key={item.id}
            label={item.value}
            isActive={item.id === value}
            onClick={() => onClick(item.id)}
          />
        );
      })}
    </div>
  );
};
