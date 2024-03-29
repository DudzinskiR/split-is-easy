import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, setNavbarOpen } from "src/features";
import { useVisibilityToggle } from "src/hooks";
import { SmallNavbar } from "./small/small-navbar.component";
import { NormalNavbar } from "./normal/normal-navbar.component";
import { NewBillModal } from "../modal";

export const Navbar = () => {
  const isNavbarOpen = useSelector(
    (state: RootState) => state.navbar.isNavbarOpen
  );
  const dispatch = useDispatch();
  const navbar = useVisibilityToggle({
    onHide: () => {
      dispatch(setNavbarOpen(false));
    },
  });

  useEffect(() => {
    navbar.setOpen(isNavbarOpen);
  }, [isNavbarOpen, navbar]);

  const newBillModal = useVisibilityToggle();
  return (
    <>
      <nav className="lg:h-16 h-12 shadow bg-slate-950 lg:bg-white duration-150">
        <div className="lg:hidden h-full">
          <SmallNavbar
            isNavbarOpen={navbar.isOpen}
            openNewBillModal={() => newBillModal.setOpen(true)}
          />
        </div>

        <div className="hidden lg:block h-full">
          <NormalNavbar
            isNavbarOpen={navbar.isOpen}
            openNewBillModal={() => newBillModal.setOpen(true)}
          />
        </div>
      </nav>
      <NewBillModal
        isOpen={newBillModal.isOpen}
        onRejected={() => newBillModal.setOpen(false)}
        setOpen={(val) => newBillModal.setOpen(val)}
      />
    </>
  );
};
