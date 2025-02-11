import { BiPlusCircle } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { NormalNavbarList } from "./components/NormalNavbarList/NormalNavbarList";
import {
  UserMenu,
  UserMenuProps,
} from "./components/NormalNavbarMenu/NormalNavbarMenu";
import { RootState } from "src/features/store";
import { PROJECT_NAME } from "src/utils/const/ProjectName";
import { Button } from "src/components/Button/Button";

export interface NormalNavbarProps extends UserMenuProps {
  openNewBillModal: () => void;
}

export const NormalNavbar = ({
  openNewBillModal,
  ...userMenuProps
}: NormalNavbarProps) => {
  const categories = useSelector((state: RootState) => state.navbar.navbarList);
  return (
    <>
      <div className="flex justify-center h-full">
        <div className="w-max-[1280px] w-[1280px] flex items-center justify-between">
          <div className="flex flex-row h-full">
            <Link
              className="px-5 text-2xl font-semibold flex items-center"
              to={"/"}
            >
              {PROJECT_NAME}
            </Link>
            <NormalNavbarList categories={categories} />
          </div>
          <div className="h-full flex flex-row items-center gap-5">
            <Button
              className="h-10"
              text="New Bill"
              icons={{ left: <BiPlusCircle /> }}
              onClick={openNewBillModal}
            />
            <div className="relative h-full">
              <UserMenu {...userMenuProps} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
