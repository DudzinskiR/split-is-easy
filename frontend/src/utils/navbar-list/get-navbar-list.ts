import { NavbarCategory, UpdateValue } from "src/types";

/**
 * Function processing navigation categories, replacing links according to update values,
 * and marking buttons as active based on the provided identifier.
 *
 * @param {NavbarCategory[]} categories - Array of navigation categories.
 * @param {number} activeID - Optional identifier of the active category.
 * @param {UpdateValue | UpdateValue[]} updateValue - Optional value or array of values for updating links.
 * @returns {NavbarCategory[]} - Updated navigation categories.
 */
export const getNavbarCategory = (
  categories: NavbarCategory[],
  activeID?: number,
  updateValue?: UpdateValue | UpdateValue[]
) => {
  const newCategories: NavbarCategory[] = [];

  for (const category of categories) {
    const newCategory: NavbarCategory = {
      buttons: [],
    };

    for (const button of category.buttons) {
      newCategory.buttons.push({
        text: button.text,
        to: replaceLink(button.to, updateValue),
        index: button.index,
        isActive: button.index === activeID,
      });
    }

    newCategories.push(newCategory);
  }

  return newCategories;
};

const replaceLink = (
  link: string,
  updateValue?: UpdateValue | UpdateValue[]
): string => {
  if (!updateValue) return link;

  let newLink = link;
  if (Array.isArray(updateValue)) {
    for (const item of updateValue) {
      newLink = newLink.replace(item.key, item.value);
    }
  } else {
    newLink = newLink.replace(updateValue.key, updateValue.value);
  }

  return newLink;
};
