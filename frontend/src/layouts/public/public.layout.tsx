import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "src/components";
import { ButtonColor } from "src/enums";
import PublicRoutes from "src/routes/public/public.route";
import { PROJECT_NAME } from "src/utils/const";
import { twMerge } from "tailwind-merge";

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
          "fixed w-full h-16 flex justify-center bg-transparent z-[100] duration-500",
          isScrolled ? "shadow-md bg-white" : ""
        )}
      >
        <div className="flex flex-row justify-around items-center max-w-7xl w-screen">
          <Link to="/">
            <div
              className={twMerge(
                "text-2xl font-semibold",
                isScrolled ? "text-black" : "text-white"
              )}
            >
              {PROJECT_NAME}
            </div>
          </Link>
          <Button
            className="w-[100px] text-lg duration-500"
            color={isScrolled ? ButtonColor.PURPLE : "bg-white text-indigo-600"}
            text="Login"
            to="/login"
          />
        </div>
      </header>
      <div className="relative flex justify-center overflow-x-hidden w-full">
        <PublicRoutes />
      </div>
    </>
  );
};

export default PublicLayout;
