import { useDemoPageContext } from "src/pages/demo/hook/useDemoPageContext";
import { demoNavbarCategories } from "../DemoNavbarCategories";
import { twMerge } from "tailwind-merge";

export const DemoNormalList = () => {
  const { openLoginModal } = useDemoPageContext();
  return (
    <ul className="h-full flex flex-row">
      {demoNavbarCategories.map((category, index) => {
        return (
          <div key={index} className=" flex flex-row items-center">
            {index !== 0 && (
              <div className="border-gray-200 h-3/5 border-r-2 last:border-0"></div>
            )}

            {category.buttons.map((button, index) => {
              return (
                <div key={index}>
                  <li className="h-full list-none">
                    <button
                      className={twMerge(
                        "h-full flex items-center justify-center min-w-[5rem] hover:text-indigo-700 duration-150 cursor-pointer box-border"
                      )}
                      onClick={openLoginModal}
                    >
                      {button.text}
                    </button>
                  </li>
                </div>
              );
            })}
          </div>
        );
      })}
    </ul>
  );
};
