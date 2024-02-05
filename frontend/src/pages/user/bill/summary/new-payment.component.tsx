import { NewPaymentButton } from "src/components";
import { NewPaymentModal } from "src/components/modal";
import { useVisibilityToggle } from "src/hooks";

export const NewPayment = () => {
  const { isOpen, setOpen } = useVisibilityToggle();
  return (
    <>
      <NewPaymentButton onClick={() => setOpen(true)} />
      <NewPaymentModal isOpen={isOpen} onRejected={() => setOpen(false)} />
    </>
  );
};

export default NewPayment;
