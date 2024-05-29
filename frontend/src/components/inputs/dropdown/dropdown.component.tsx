import {
  InputHTMLAttributes,
  ReactNode,
  useEffect,
  useId,
  useState,
} from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { containsSubstring, filterByPrefix } from "./helper/dropdown.helper";
import DropdownContextProvider from "./context/dropdown.context";
import { DropdownList } from "./component/list/dropdown-list.component";
import { SelectedOption } from "src/types/other/selected-option.type";
import { Button, ButtonProps } from "src/components/button/button.component";
import { useVisibilityToggle } from "src/hooks/visibility-toggle/visibility-toggle.hook";
import { useClickOutside } from "src/hooks/click-outside/click-outside.hook";
import { FadeInOut } from "src/components/fade-in-out/fade-in-out.component";

export interface DropdownProps {
  inputText?: InputHTMLAttributes<HTMLInputElement>;
  onChange: (val: string[]) => void;
  options: SelectedOption[];
  values: string[];
  showSelectAllRowButton?: boolean;
  height?: number;
  rowHeight?: number;
  button?: ButtonProps;
  label: string;
  filterType?: "START" | "INCLUDE";
  rowElement?: (data: SelectedOption, isChecked: boolean) => ReactNode;
  filter?: (searchText: string, options: SelectedOption[]) => SelectedOption[];
}

export const Dropdown = ({
  onChange,
  options,
  values,
  showSelectAllRowButton = false,
  height = 240,
  rowHeight = 40,
  button,
  label,
  filterType = "INCLUDE",
  inputText,
  rowElement,
  filter,
}: DropdownProps) => {
  const { isOpen, setOpen } = useVisibilityToggle();
  const boxRef = useClickOutside(() => setOpen(false));

  const [searchText, setSearchText] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<SelectedOption[]>([]);
  const inputTextID = useId();

  useEffect(() => {
    if (!searchText) {
      setFilteredOptions(options);
    }

    if (filter) {
      setFilteredOptions(filter(searchText, options));
      return;
    }
    switch (filterType) {
      case "START":
        setFilteredOptions(options.filter(filterByPrefix(searchText)));
        break;
      case "INCLUDE":
        setFilteredOptions(options.filter(containsSubstring(searchText)));
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options, searchText, filter]);

  return (
    <div className="relative w-full" ref={boxRef}>
      <Button
        text={label}
        {...button}
        onClick={() => setOpen(!isOpen)}
        icons={{ right: isOpen ? <IoIosArrowUp /> : <IoIosArrowDown /> }}
      />
      <FadeInOut isOpen={isOpen} transitionDuration={150}>
        <DropdownContextProvider
          value={{
            onChange,
            options,
            values,
            showSelectAllRowButton,
            height,
            rowHeight,
            button,
            label,
            filterType,
            rowElement,
          }}
        >
          <div className="absolute translate-y-2 w-full z-50 rounded shadow border-2">
            <input
              className="bg-slate-100 focus:bg-slate-100 w-full h-10 border-b-4 border-sky-500 pl-2 focus:outline-0"
              value={searchText}
              onChange={(val) => setSearchText(val.target.value)}
              placeholder="Search..."
              id={inputTextID}
              autoFocus
              {...inputText}
            />
            <DropdownList filteredOptions={filteredOptions} />
          </div>
        </DropdownContextProvider>
      </FadeInOut>
    </div>
  );
};
