import { AiOutlineUser } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useDispatch } from "react-redux";
import { FadeInOut } from "src/components/FadeInOut/FadeInOut";
import { useAccountHook } from "src/features/account/hook/useAccountHook";
import {
  setNavbarOpen,
  toggleNavbarOpen,
} from "src/features/navbar/navbarSlice";
import { useUsersHook } from "src/features/users/hook/useUsersHook";
import { useClickOutside } from "src/hooks/useClickOutside/useClickOutside";
import { useSignOut } from "src/hooks/useSignOut/useSignOut";

import { UserMenuButton } from "./NormalNavbarMenuButton";

export interface UserMenuProps {
  isNavbarOpen: boolean;
}

export const UserMenu = ({ isNavbarOpen }: UserMenuProps) => {
  const { getAccountID } = useAccountHook();
  const { getUsername } = useUsersHook();
  const dispatch = useDispatch();
  const signOut = useSignOut();
  const boxRef = useClickOutside(() => dispatch(setNavbarOpen(false)));

  return (
    <>
      <div
        className=" relative h-full flex flex-row items-center gap-2 hover:bg-slate-50 duration-150 cursor-pointer px-3"
        onClick={() => {
          if (!isNavbarOpen) setTimeout(() => dispatch(toggleNavbarOpen()), 0);
        }}
      >
        <div className="text-3xl text-slate-600">
          <AiOutlineUser />
        </div>
        <div className="text-slate-600 text-sm w-48 truncate">
          {getUsername(getAccountID())}
        </div>
        <div>
          <MdOutlineKeyboardArrowDown />
        </div>
      </div>
      <FadeInOut isOpen={isNavbarOpen} transitionDuration={100}>
        <div
          className="absolute top-2 absolute-center-x w-4/5 bg-slate-800 rounded-md shadow flex flex-col gap-2 px-2 py-3 z-50"
          ref={boxRef}
        >
          <UserMenuButton text={"User"} icon={<AiOutlineUser />} to={"/user"} />
          <UserMenuButton
            text={"Logout"}
            icon={<BiLogOut />}
            onClick={signOut}
          />
        </div>
      </FadeInOut>
    </>
  );
};
