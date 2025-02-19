import { AiOutlineArrowRight, AiOutlineUser } from "react-icons/ai";
import { BiPlusCircle } from "react-icons/bi";
import { Button } from "src/components/Button/Button";
import { useClickOutside } from "src/hooks/useClickOutside/useClickOutside";
import { DemoSmallList } from "./DemoSmallList";
import { useDemoPageContext } from "src/pages/demo/hook/useDemoPageContext";

interface DemoSmallNavbarMenuProps {
  onClickOutside: () => void;
}

export const DemoSmallNavbarMenu = ({
  onClickOutside,
}: DemoSmallNavbarMenuProps) => {
  const menuRef = useClickOutside(() => onClickOutside());
  const { openLoginModal } = useDemoPageContext();
  return (
    <section
      className="absolute absolute-center-x bg-slate-800 w-11/12 top-5 z-10 rounded-lg flex flex-col gap-3 p-3"
      ref={menuRef}
    >
      <div className="bg-slate-700 hover:bg-slate-600 w-full h-12 rounded-lg flex flex-row items-center justify-between cursor-pointer duration-150">
        <div className="flex flex-row h-full items-center">
          <div className="text-3xl text-white pl-2">
            <AiOutlineUser />
          </div>
          <div className="text-white pl-3 font-semibold">Demo User</div>
        </div>
        <div className="text-2xl text-white pr-4">
          <AiOutlineArrowRight />
        </div>
      </div>

      <Button
        text="New bill"
        icons={{ left: <BiPlusCircle /> }}
        className="w-full"
        onClick={openLoginModal}
      />
      <DemoSmallList />
    </section>
  );
};
