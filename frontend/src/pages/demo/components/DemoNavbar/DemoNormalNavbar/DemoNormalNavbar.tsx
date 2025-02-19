import { BiPlusCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import { Button } from "src/components/Button/Button";
import { PROJECT_NAME } from "src/utils/const/ProjectName";
import { DemoUserMenu } from "./DemoUserMenu";
import { DemoNormalList } from "./DemoNormalList";
import { useDemoPageContext } from "src/pages/demo/hook/useDemoPageContext";

export const DemoNormalNavbar = () => {
  const { openLoginModal } = useDemoPageContext();
  return (
    <div className="flex justify-center h-full w-screen">
      <div className="w-max-[1280px] w-[1280px] flex items-center justify-between">
        <div className="flex flex-row h-full">
          <Link
            className="px-5 text-2xl font-semibold flex items-center"
            to={"/"}
          >
            {PROJECT_NAME}
          </Link>
          <DemoNormalList />
        </div>
        <div className="h-full flex flex-row items-center gap-5">
          <Button
            className="h-10"
            text="New Bill"
            icons={{ left: <BiPlusCircle /> }}
            onClick={openLoginModal}
          />
          <div className="relative h-full">
            <DemoUserMenu />
          </div>
        </div>
      </div>
    </div>
  );
};
