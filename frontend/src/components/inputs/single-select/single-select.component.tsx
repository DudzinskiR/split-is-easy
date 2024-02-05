import { ReactNode, useRef } from "react";
import { Dropdown } from "../dropdown";
import { SelectedOption } from "src/types";
import { ButtonProps } from "src/components";

export interface SingleSelectProps {
  options: SelectedOption[];
  value: string | undefined;
  onChange: (val: string | undefined) => void;
  label: string;
  button?: ButtonProps;
  rowElement?: (data: SelectedOption, isChecked: boolean) => ReactNode;
  rowHeight?: number;
  filter?: (searchText: string, options: SelectedOption[]) => SelectedOption[];
}

export const SingleSelect = ({
  options,
  value,
  onChange,
  label,
  button,
  rowElement,
  rowHeight = 40,
  filter,
}: SingleSelectProps) => {
  const selectedValue = useRef(value);

  const onChangeHandler = (val: string[]) => {
    const newValue = val.filter((item) => item !== selectedValue.current)[0];
    selectedValue.current = newValue;
    onChange(newValue);
  };
  return (
    <Dropdown
      rowHeight={rowHeight}
      onChange={onChangeHandler}
      options={options}
      values={value ? [value] : []}
      label={label}
      button={button}
      rowElement={rowElement}
      filter={filter}
    />
  );
};
