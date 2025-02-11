import { NewPaymentModal } from "src/components/modal/modals/NewPaymentModal/NewPaymentModal";
import { NewPaymentButton } from "src/components/NewPaymentButton/NewPaymentButton";
import { useVisibilityToggle } from "src/hooks/useVisibilityToggle/useVisibilityToggle";

export const NewPayment = () => {
  const { isOpen, setOpen } = useVisibilityToggle();
  return (
    <>
      <NewPaymentButton onClick={() => setOpen(true)} />
      <NewPaymentModal isOpen={isOpen} onRejected={() => setOpen(false)} />
    </>
  );
};
