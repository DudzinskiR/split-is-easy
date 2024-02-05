import { AiOutlineArrowRight, AiOutlineUser } from "react-icons/ai";
import { BiPlusCircle } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "src/components";
import { ButtonColor } from "src/enums";
import { RootState, setNavbarOpen } from "src/features";
import { useUsersHook } from "src/features/users/hook";
import { useClickOutside, useSignOut } from "src/hooks";

import { SmallNavbarList } from "../list/small-navbar-list.component";

interface SmallNavbarMenuProps {
  openNewBillModal: () => void;
}

export const SmallNavbarMenu = ({ openNewBillModal }: SmallNavbarMenuProps) => {
  const dispatch = useDispatch();
  const userID = useSelector((state: RootState) => state.account.userID);
  const menuRef = useClickOutside(() => dispatch(setNavbarOpen(false)));
  const { getUsername } = useUsersHook();
  const signOut = useSignOut();
  return (
    <section
      className="absolute absolute-center-x bg-slate-800 w-11/12 top-5 z-10 rounded-lg flex flex-col gap-3 p-3"
      ref={menuRef}
    >
      <Link
        className="bg-slate-700 hover:bg-slate-600 w-full h-12 rounded-lg flex flex-row items-center justify-between cursor-pointer duration-150"
        to={"/user"}
      >
        <div className="flex flex-row h-full items-center">
          <div className="text-3xl text-white pl-2">
            <AiOutlineUser />
          </div>
          <div className="text-white pl-3 font-semibold">
            {getUsername(userID)}
          </div>
        </div>
        <div className="text-2xl text-white pr-4">
          <AiOutlineArrowRight />
        </div>
      </Link>

      <Button
        text="New bill"
        icons={{ left: <BiPlusCircle /> }}
        className="w-full"
        onClick={openNewBillModal}
      />

      <SmallNavbarList />

      <Button
        text="Logout"
        icons={{ left: <BiPlusCircle /> }}
        className="w-full"
        color={ButtonColor.PURPLE}
        onClick={signOut}
      />
    </section>
  );
};
