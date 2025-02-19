import { twMerge } from "tailwind-merge";
import { demoNavbarCategories } from "../DemoNavbarCategories";
import { useDemoPageContext } from "src/pages/demo/hook/useDemoPageContext";

export const DemoSmallList = () => {
  const { openLoginModal } = useDemoPageContext();
  return (
    <ul className="h-full flex flex-col">
      {demoNavbarCategories.map((category, index) => {
        return (
          <div key={index} className="flex flex-col items-center gap-2">
            {index !== 0 && (
              <div className="border-gray-500 w-11/12 border-b-2 last:border-0 pt-2"></div>
            )}

            {category.buttons.map((button, index) => {
              return (
                <button
                  key={index}
                  className="bg-slate-700 hover:bg-slate-600 w-full h-12 rounded-lg flex flex-row duration-150 cur"
                  onClick={openLoginModal}
                >
                  {button.isActive && (
                    <div className="bg-sky-500 h-full w-2 rounded-l"></div>
                  )}
                  <div
                    className={twMerge(
                      "h-full flex items-center text-white font-semibold",
                      button.isActive ? "pl-10" : "pl-14"
                    )}
                  >
                    {button.text}
                  </div>
                </button>
              );
            })}
          </div>
        );
      })}
    </ul>
  );
};
