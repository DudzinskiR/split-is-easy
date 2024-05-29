import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SmallNavbarMenu } from "./components/menu/small-navbar-menu.component";
import { RootState } from "src/features/store";
import { FadeInOut } from "src/components/fade-in-out/fade-in-out.component";
import { setNavbarOpen } from "src/features/navbar/navbar.slice";
import { PROJECT_NAME } from "src/utils/const/text-const";

export interface SmallNavbar {
  isNavbarOpen: boolean;
  openNewBillModal: () => void;
}

export const SmallNavbar = ({
  isNavbarOpen,
  openNewBillModal,
}: SmallNavbar) => {
  const dispatch = useDispatch();
  const isMenuOpen = useSelector(
    (state: RootState) => state.navbar.isNavbarOpen
  );
  return (
    <>
      <div className="relative flex items-center justify-center h-full">
        <div className="text-2xl text-white hover:text-slate-200 font-semibold cursor-pointer">
          <Link to={"/"}>{PROJECT_NAME}</Link>
        </div>

        <div
          className="text-white hover:text-slate-200 absolute right-10 absolute-center-y text-3xl cursor-pointer"
          onClick={() => {
            if (!isMenuOpen) dispatch(setNavbarOpen(true));
          }}
        >
          <GiHamburgerMenu />
        </div>
      </div>
      <FadeInOut isOpen={isNavbarOpen}>
        <SmallNavbarMenu openNewBillModal={openNewBillModal} />
      </FadeInOut>
    </>
  );
};
