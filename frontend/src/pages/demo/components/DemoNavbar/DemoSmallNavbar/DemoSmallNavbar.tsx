import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { FadeInOut } from "src/components/FadeInOut/FadeInOut";
import { PROJECT_NAME } from "src/utils/const/ProjectName";
import { DemoSmallNavbarMenu } from "./DemoSmallNavbarMenu";

export const DemoSmallNavbar = () => {
  const [isNavbarOpen, setNavbarOpen] = useState(false);
  return (
    <>
      <div className="relative flex items-center justify-center h-full w-screen">
        <div className="text-2xl text-white hover:text-slate-200 font-semibold cursor-pointer">
          <Link to={"/"}>{PROJECT_NAME}</Link>
        </div>

        <div
          className="text-white hover:text-slate-200 absolute right-10 absolute-center-y text-3xl cursor-pointer"
          onClick={() => {
            setTimeout(() => setNavbarOpen(true), 10);
          }}
        >
          <GiHamburgerMenu />
        </div>
      </div>
      <FadeInOut isOpen={isNavbarOpen}>
        <DemoSmallNavbarMenu
          onClickOutside={() => {
            setNavbarOpen(false);
          }}
        />
      </FadeInOut>
    </>
  );
};
