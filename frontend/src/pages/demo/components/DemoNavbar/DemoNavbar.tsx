import { DemoNormalNavbar } from "./DemoNormalNavbar/DemoNormalNavbar";
import { DemoSmallNavbar } from "./DemoSmallNavbar/DemoSmallNavbar";

export const DemoNavbar = () => {
  return (
    <>
      <nav className="lg:h-16 h-12 shadow bg-slate-950 lg:bg-white duration-150">
        <div className="lg:hidden h-full">
          <DemoSmallNavbar
          // isNavbarOpen={navbar.isOpen}
          // openNewBillModal={() => newBillModal.setOpen(true)}
          />
        </div>

        <div className="hidden lg:block h-full">
          <DemoNormalNavbar
          // isNavbarOpen={navbar.isOpen}
          // openNewBillModal={() => newBillModal.setOpen(true)}
          />
        </div>
      </nav>
    </>
  );
};
