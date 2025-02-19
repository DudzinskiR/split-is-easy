import { SelectedOption } from "src/types/other/SelectedOption";

export const filterByPrefix =
  (searchText: string) => (option: SelectedOption) => {
    return option.value.toUpperCase().startsWith(searchText.toUpperCase());
  };

export const containsSubstring =
  (searchText: string) => (option: SelectedOption) => {
    return option.value.toUpperCase().includes(searchText.toUpperCase());
  };

export const toggleValue = (
  id: string,
  value: string[],
  options: SelectedOption[]
) => {
  const option = value.find((item) => item === id);
  if (option) {
    return value.filter((item) => item !== id);
  } else {
    return [...value, options.find((opt) => opt.id === id)!.id];
  }
};

export const setAllFilteredOptions = (
  selectedOptions: string[],
  filteredOptions: SelectedOption[]
) => {
  const allAreSelected = checkAllFilteredAreSelected(
    selectedOptions,
    filteredOptions
  );

  if (allAreSelected) {
    let newOptions = [...selectedOptions];
    for (const item of filteredOptions) {
      newOptions = newOptions.filter((opt) => opt !== item.id);
    }
    return newOptions;
  } else {
    const newOptions = [...selectedOptions];
    for (const filteredOption of filteredOptions) {
      const selectedOption = selectedOptions.find(
        (option) => option === filteredOption.id
      );

      if (selectedOption) continue;

      newOptions.push(filteredOption.id);
    }

    return newOptions;
  }
};

export const checkAllFilteredAreSelected = (
  selectedOptions: string[],
  filteredOptions: SelectedOption[]
) => {
  let result = true;

  for (const filteredOption of filteredOptions) {
    const option = selectedOptions.find((item) => item === filteredOption.id);
    result = result && !!option;
  }

  return result;
};

export const getListBoxHeight = (
  maxHeight: number,
  optionsNumber: number,
  rowHeight: number,
  selectAllRow: boolean
) => {
  let height = optionsNumber * rowHeight;
  if (selectAllRow && optionsNumber > 0) {
    height += rowHeight;
  }
  return Math.min(maxHeight, height);
};
