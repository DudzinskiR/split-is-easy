import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "src/components";
import { ButtonColor } from "src/enums";
import PublicRoutes from "src/routes/public/public.route";
import { PROJECT_NAME } from "src/utils/const";
import { twJoin, twMerge } from "tailwind-merge";

const PublicLayout = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={twMerge(
          "fixed w-full h-16 flex justify-center bg-transparent z-[100] duration-500 overflow-hidden",
          isScrolled ? "shadow-lg" : ""
        )}
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
        <div className="flex flex-row justify-around items-center max-w-7xl w-screen">
          <Link to="/">
            <div className={twMerge("text-2xl font-semibold", "text-white")}>
              {PROJECT_NAME}
            </div>
          </Link>
        </div>
      </header>
      <div className="relative flex justify-center overflow-x-hidden w-full">
        <PublicRoutes />
      </div>
    </>
  );
};

export default PublicLayout;
