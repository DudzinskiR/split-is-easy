import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setNavbarList } from "src/features/navbar/navbar.slice";
import { NavbarCategory } from "src/types/navbar/navbar-category.type";
import { UpdateValue } from "src/types/navbar/navbar-update-value.type";
import { getNavbarCategory } from "src/utils/navbar-list/get-navbar-list";

/**
 * Custom React Hook for updating the Navbar List in the Redux store based on the provided categories,
 * activeID, and update values.
 *
 * @param {NavbarCategory[]} categories - Array of navigation categories.
 * @param {number} activeID - Optional identifier of the active category.
 * @param {UpdateValue | UpdateValue[]} updateValue - Optional value or array of values for updating links.
 * @returns {void} - No return value.
 */
export const useNavbarList = (
  categories: NavbarCategory[],
  activeID?: number,
  updateValue?: UpdateValue | UpdateValue[]
) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setNavbarList(getNavbarCategory(categories, activeID, updateValue))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return;
};
