import { useState, useEffect, MutableRefObject } from "react";
import { twMerge, twJoin } from "tailwind-merge";
import { NavbarElement } from "../../public-home.page";
import { PROJECT_NAME } from "src/utils/const";

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
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > height);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [height]);

  const scrollToTarget = (index: number) => {
    const targetRef = segmentsRef.current[index];
    if (targetRef) {
      const rect = targetRef.getBoundingClientRect();
      window.scrollTo({
        top: window.scrollY + rect.top - height,
        behavior: "smooth",
      });
    }
  };

  return (
    <header
      className={twMerge(
        "fixed w-full flex justify-center bg-transparent z-[100] duration-500 overflow-hidden",
        isScrolled ? "shadow-lg" : ""
      )}
      style={{ height: height }}
    >
      <div
        className={twJoin(
          "absolute w-screen h-screen -z-10",
          isScrolled ? "" : "hidden"
        )}
        style={{
          background:
            "linear-gradient(45deg, rgba(0,0,70,1) 0%, rgba(79,28,150,1) 33%, rgba(28,181,224,1) 100%)",
          backgroundAttachment: "scroll",
        }}
      ></div>
      <div className="flex flex-row justify-around w-full">
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
