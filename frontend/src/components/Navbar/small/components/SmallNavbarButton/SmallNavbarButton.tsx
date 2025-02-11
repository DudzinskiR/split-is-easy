import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setNavbarOpen } from "src/features/navbar/navbarSlice";
import { NavbarButton } from "src/types/navbar/NavbarButton";
import { twMerge } from "tailwind-merge";

interface SmallNavbarButtonProps {
  data: NavbarButton;
}

export const SmallNavbarButton = ({ data }: SmallNavbarButtonProps) => {
  const dispatch = useDispatch();
  return (
    <Link
      className="bg-slate-700 hover:bg-slate-600 w-full h-12 rounded-lg flex flex-row duration-150 cur"
      to={data.to}
      onClick={() => dispatch(setNavbarOpen(false))}
    >
      {data.isActive && <div className="bg-sky-500 h-full w-2 rounded-l"></div>}
      <div
        className={twMerge(
          "h-full flex items-center text-white font-semibold",
          data.isActive ? "pl-10" : "pl-14"
        )}
      >
        {data.text}
      </div>
    </Link>
  );
};
