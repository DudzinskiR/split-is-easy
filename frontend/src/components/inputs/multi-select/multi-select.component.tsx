import { SelectedOption } from "src/types";
import { Dropdown } from "../dropdown";
import { ButtonProps } from "src/components";

export interface MultiSelectProps {
  options: SelectedOption[];
  values: string[];
  onChange: (val: string[]) => void;
  label: string;
  button?: ButtonProps;
}

export const MultiSelect = ({
  options,
  values,
  onChange,
  label,
  button,
}: MultiSelectProps) => {
  return (
    <Dropdown
      onChange={onChange}
      options={options}
      values={values}
      label={label}
      button={button}
      //---------------//
      showSelectAllRowButton
    />
  );
};
