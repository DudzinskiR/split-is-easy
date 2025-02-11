import { ButtonProps } from "src/components/Button/Button";
import { SelectedOption } from "src/types/other/SelectedOption";

import { Dropdown } from "../Dropdown/Dropdown";

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
