import { NewPaymentModal } from "src/components/modal/modals/new-payment/new-payment-modal.component";
import { NewPaymentButton } from "src/components/new-payment-button/new-payment-button.component";
import { useVisibilityToggle } from "src/hooks/visibility-toggle/visibility-toggle.hook";

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
