import { ModalWrapperProps } from "src/interfaces/modal/ModalWrapperProps";
import { ModalWrapper } from "../../ModalWrapper";
import { Button } from "src/components/Button/Button";
import { ButtonColor } from "src/enums/ButtonColor/ButtonColor";

interface DemoLoginModalProps extends ModalWrapperProps {}

export const DemoLoginModal = ({ ...wrapperProps }: DemoLoginModalProps) => {
  return (
    <ModalWrapper {...wrapperProps}>
      <div className="text-center">
        <p className="text-3xl mb-5">Are you interested?</p>
        <p className="text-xl">Try the full version for free!</p>
        <div className="mt-5 flex flex-col gap-5">
          <Button text="Login" to="/login" color={ButtonColor.GREEN} />
          <Button
            text="Sign Up"
            to="/login?t=sign-up"
            color={ButtonColor.PURPLE}
          />
        </div>
      </div>
    </ModalWrapper>
  );
};
