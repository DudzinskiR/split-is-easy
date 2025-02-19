import { NavbarCategory } from "src/types/navbar/NavbarCategory";
import { NormalNavbarButton } from "../NormalNavbarButton/NormalNavbarButton";

interface CategoriesListProps {
  categories: NavbarCategory[];
}

export const NormalNavbarList = ({ categories }: CategoriesListProps) => {
  return (
    <ul className="h-full flex flex-row">
      {categories.map((category, index) => {
        return (
          <div key={index} className=" flex flex-row items-center">
            {index !== 0 && (
              <div className="border-gray-200 h-3/5 border-r-2 last:border-0"></div>
            )}

            {category.buttons.map((button, index) => {
              return (
                <NormalNavbarButton
                  key={index}
                  text={button.text}
                  to={button.to}
                  isActive={button.isActive!}
                />
              );
            })}
          </div>
        );
      })}
    </ul>
  );
};
