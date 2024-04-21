import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "src/components";
import { InputText } from "src/components/inputs";
import { ModalWrapper } from "src/components/modal";
import { ButtonColor } from "src/enums";
import { useAPI } from "src/hooks";
import { ModalWrapperProps } from "src/interfaces";
import { isValidUsername } from "src/utils/validators";

interface AddVirtualUserModalProps extends ModalWrapperProps {
  setOpen: (val: boolean) => void;
}

export const AddVirtualUserModal = ({
  setOpen,
  onRejected,
  ...wrapperProps
}: AddVirtualUserModalProps) => {
  const [virtualUsername, setVirtualUsername] = useState("");
  const [isSending, setSending] = useState(false);
  const { post } = useAPI();
  const { billID } = useParams();

  const sendVirtualUser = () => {
    setSending(true);
    post({
      url: `bill/${billID}/admin/virtual`,
      body: { username: virtualUsername },
      onSuccess: () => {
        setVirtualUsername("");
        setSending(false);
        setOpen(false);
      },
    });
  };

  return (
    <ModalWrapper
      {...wrapperProps}
      onRejected={() => {
        setVirtualUsername("");
        setOpen(false);
        if (onRejected) onRejected();
      }}
      className="flex flex-col items-center gap-5"
    >
      <div className="text-2xl text-center font-semibold">
        Add new virtual user
      </div>
      <InputText
        label="Username (min 4 chars)"
        value={virtualUsername}
        error={
          !isValidUsername(virtualUsername) && virtualUsername.length !== 0
        }
        onChange={(e) => setVirtualUsername(e.target.value)}
      />
      <Button
        color={ButtonColor.GREEN}
        className="w-32"
        text="Create"
        disabled={!isValidUsername(virtualUsername) || isSending}
        onClick={sendVirtualUser}
      />
    </ModalWrapper>
  );
};
