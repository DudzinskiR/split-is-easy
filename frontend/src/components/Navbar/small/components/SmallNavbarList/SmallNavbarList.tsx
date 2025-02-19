import { useSelector } from "react-redux";
import { RootState } from "src/features/store";
import { SmallNavbarButton } from "../SmallNavbarButton/SmallNavbarButton";

export const SmallNavbarList = () => {
  const categories = useSelector((state: RootState) => state.navbar.navbarList);

  return (
    <ul className="h-full flex flex-col">
      {categories.map((category, index) => {
        return (
          <div key={index} className="flex flex-col items-center gap-2">
            {index !== 0 && (
              <div className="border-gray-500 w-11/12 border-b-2 last:border-0 pt-2"></div>
            )}

            {category.buttons.map((button, index) => {
              return <SmallNavbarButton key={index} data={button} />;
            })}
          </div>
        );
      })}
    </ul>
  );
};
