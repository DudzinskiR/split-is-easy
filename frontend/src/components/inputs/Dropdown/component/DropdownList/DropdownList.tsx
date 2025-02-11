import { CSSProperties } from "react";
import { SelectedOption } from "src/types/other/SelectedOption";

import {
  checkAllFilteredAreSelected,
  getListBoxHeight,
  setAllFilteredOptions,
  toggleValue,
} from "../../helper/dropdownHelper";
import { useDropdownContext } from "../../hook/useDropdownContext";
import { DropdownButton } from "../DropdownButton/DropdownButton";
import { VirtualList } from "src/components/VirtualList/VirtualList";

interface DropdownListProps {
  filteredOptions: SelectedOption[];
}

export const DropdownList = ({ filteredOptions }: DropdownListProps) => {
  const {
    height = 0,
    rowHeight = 0,
    showSelectAllRowButton = false,
    values,
    options,
    onChange,
    rowElement,
  } = useDropdownContext();

  const onClickHandler = (id: string) => () => {
    onChange(toggleValue(id, values, options));
  };

  const setAllOptions = () => {
    onChange(setAllFilteredOptions(values, filteredOptions));
  };

  const listHeight = getListBoxHeight(
    height,
    filteredOptions.length,
    rowHeight,
    showSelectAllRowButton
  );

  const renderRow = (index: number, style: CSSProperties) => {
    const isChecked = !!values.find(
      (item) => item === filteredOptions[index].id
    );
    if (rowElement) {
      const option = options.find(
        (item) => item.id === filteredOptions[index].id
      );
      return (
        <div
          onClick={onClickHandler(filteredOptions[index].id)}
          key={filteredOptions[index].id}
          style={style}
        >
          {rowElement(option!, isChecked)}
        </div>
      );
    }

    return (
      <DropdownButton
        style={style}
        key={filteredOptions[index].id}
        text={filteredOptions[index].value}
        isChecked={isChecked}
        onClick={onClickHandler(filteredOptions[index].id)}
      />
    );
  };

  if (filteredOptions.length <= 0 || values === undefined) return;
  return (
    <ul
      className=" bg-white overflow-hidden duration-150"
      role="listbox"
      style={{
        height: `${listHeight}px`,
      }}
    >
      {filteredOptions.length >= 2 && showSelectAllRowButton && (
        <DropdownButton
          text={"Select All"}
          isChecked={checkAllFilteredAreSelected(values, filteredOptions)}
          onClick={setAllOptions}
          className="border-b-[3px] border-slate-300 box-content"
        />
      )}

      <VirtualList
        rowElement={renderRow}
        height={listHeight - (showSelectAllRowButton ? rowHeight : 0)}
        itemCount={filteredOptions.length}
        itemHeight={rowHeight}
      />
    </ul>
  );
};
