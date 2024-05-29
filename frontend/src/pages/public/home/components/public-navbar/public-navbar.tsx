import { MutableRefObject } from "react";
import { twJoin } from "tailwind-merge";
import { NavbarElement } from "../../public-home.page";
import { PROJECT_NAME } from "src/utils/const/text-const";

interface PublicNavbarProps {
  elements: NavbarElement[];
  segmentsRef: MutableRefObject<HTMLDivElement[]>;
  height?: number;
}

export const PublicNavbar = ({
  elements,
  segmentsRef,
  height = 64,
}: PublicNavbarProps) => {
  const scrollToTarget = (index: number) => {
    const targetRef = segmentsRef.current[index];
    if (targetRef) {
      const rect = targetRef.getBoundingClientRect();
      window.scrollTo({
        top: window.scrollY + rect.top,
        behavior: "smooth",
      });
    }
  };

  return (
    <header
      className={twJoin(
        "fixed w-full flex justify-center bg-transparent z-[100] duration-500 shadow-lg"
      )}
      style={{ height: height }}
    >
      <div
        className={twJoin(
          "absolute w-full h-full -z-10 bg-clip-padding backdrop-filter backdrop-blur-sm bg-[#0e1129] bg-opacity-50 duration-300"
        )}
      ></div>
      <div className="flex flex-row justify-around max-w-7xl w-full">
        <div
          className="flex justify-center items-center text-2xl font-medium text-white/90 uppercase cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          {PROJECT_NAME}
        </div>
        <div className="sm:flex flex-row w-[500px] justify-around hidden">
          {elements.map((item, index) => {
            if (item.name)
              return (
                <div
                  key={index}
                  className="flex justify-center items-center text-xl font-medium text-white/70 hover:text-white uppercase cursor-pointer duration-200"
                  onClick={() => scrollToTarget(index)}
                >
                  {item.name}
                </div>
              );
          })}
        </div>
      </div>
    </header>
  );
};
