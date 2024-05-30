import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "src/components/button/button.component";
import { InputText } from "src/components/inputs/input-text/input-text.component";
import { ButtonColor } from "src/enums/button-color/button-color";
import { useAPI } from "src/hooks/api/api.hook";
import { ModalWrapperProps } from "src/interfaces/modal/modal-wrapper-props.interface";
import { isValidUsername } from "src/utils/validators/username/username.validator";

import { ModalWrapper } from "../../modal-wrapper.component";

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
