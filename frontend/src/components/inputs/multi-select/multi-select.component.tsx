import { ButtonProps } from "src/components/button/button.component";
import { SelectedOption } from "src/types/other/selected-option.type";
import { Dropdown } from "../dropdown/dropdown.component";

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
