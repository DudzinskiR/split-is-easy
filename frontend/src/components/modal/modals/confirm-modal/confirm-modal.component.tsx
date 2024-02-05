import { Fragment, ReactNode } from "react";
import { Button, ButtonProps } from "src/components";
import { ModalWrapper } from "src/components/modal";
import { ButtonColor } from "src/enums";
import { ModalWrapperProps, ModalWrapperStyles } from "src/interfaces";
import { twMerge } from "tailwind-merge";

interface ConfirmModalProps extends ModalWrapperProps {
  data?: ConfirmModalData;
  modalStyles?: ConfirmModalStyles;
  onSuccess?: () => void;
}

interface ConfirmModalData {
  title?: ReactNode | string;
  description?: ReactNode | string;
  buttons?: ConfirmModalButton[];
}

interface ConfirmModalButton {
  type?: "YES" | "NO" | "OTHER";
  props?: ButtonProps;
}

interface ConfirmModalStyles extends ModalWrapperStyles {
  buttons?: string;
}

export const ConfirmModal = ({
  data,
  isOpen,
  modalStyles,
  onSuccess,
  onRejected,
  ...otherProps
}: ConfirmModalProps) => {
  const renderConfirmButton = () => {
    return (
      <Button
        className=""
        text="Yes"
        onClick={onSuccess}
        color={ButtonColor.BLUE}
      />
    );
  };

  const renderCancelButton = () => {
    return (
      <Button
        className=""
        text="No"
        color={ButtonColor.RED}
        onClick={onRejected}
      />
    );
  };

  const renderText = (textData: ReactNode | string, className?: string) => {
    if (typeof textData === "string") {
      return <p className={className}>{textData}</p>;
    } else {
      return <div className={className}>{textData}</div>;
    }
  };

  const renderDefaultButtons = () => {
    return (
      <>
        {renderConfirmButton()}
        {renderCancelButton()}
      </>
    );
  };

  const renderCustomButtons = () => {
    return data?.buttons?.map((item, index) => {
      switch (item.type) {
        case "YES":
          return <Fragment key={index}>{renderConfirmButton()}</Fragment>;
        case "NO":
          return <Fragment key={index}>{renderCancelButton()}</Fragment>;
        case "OTHER":
        default:
          return <Button key={index} {...item.props} />;
      }
    });
  };

  return (
    <ModalWrapper onRejected={onRejected} isOpen={isOpen} {...otherProps}>
      {data?.title &&
        renderText(data.title, "text-2xl text-black font-semibold text-center")}

      {data?.description &&
        renderText(data.description, "text-xl mt-6 text-black text-center")}

      <div
        className={twMerge(
          "flex flex-row w-full gap-10 mt-10",
          modalStyles?.buttons
        )}
      >
        {data?.buttons ? renderCustomButtons() : renderDefaultButtons()}
      </div>
    </ModalWrapper>
  );
};
