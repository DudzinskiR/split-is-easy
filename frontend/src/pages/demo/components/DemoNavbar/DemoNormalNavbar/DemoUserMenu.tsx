import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

export const DemoUserMenu = () => {
  return (
    <div
      className=" relative h-full flex flex-row items-center gap-2 hover:bg-slate-50 duration-150 cursor-pointer px-3"
      // onClick={() => {
      //   if (!isNavbarOpen) setTimeout(() => dispatch(toggleNavbarOpen()), 0);
      // }}
    >
      <div className="text-3xl text-slate-600">
        <AiOutlineUser />
      </div>
      <div className="text-slate-600 text-sm w-48 truncate">Demo User</div>
      <div>
        <MdOutlineKeyboardArrowDown />
      </div>
    </div>
  );
};
