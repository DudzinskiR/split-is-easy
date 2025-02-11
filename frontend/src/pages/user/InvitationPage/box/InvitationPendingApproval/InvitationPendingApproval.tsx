import { ConfirmModal } from "src/components/modal/modals/ConfirmModal/ConfirmModal";
import { ButtonColor } from "src/enums/ButtonColor/ButtonColor";
import { useAPI } from "src/hooks/useAPI/useAPI";
import { useVisibilityToggle } from "src/hooks/useVisibilityToggle/useVisibilityToggle";
import { API } from "src/utils/api/api";

import { InvitationBoxTemplate } from "../InvitationBoxTemplate/InvitationBoxTemplate";

interface InvitationPendingApprovalProps {
  billName: string;
  billID: string;
  onClick: () => void;
}

export const InvitationPendingApproval = ({
  billName,
  billID,
  onClick,
}: InvitationPendingApprovalProps) => {
  const cancelRequestModal = useVisibilityToggle();
  const { del } = useAPI();

  const cancelRequest = () => {
    del({
      url: `inv/${billID}`,
      onSuccess: (res) => {
        if (API.isOk(res)) {
          onClick();
        }
      },
    });
  };

  return (
    <>
      <InvitationBoxTemplate
        title={""}
        billName={billName}
        sideText={"Waiting for approval from administrator"}
        button={{
          color: ButtonColor.RED,
          text: "Cancel request",
          onClick: () => cancelRequestModal.setOpen(true),
        }}
      />
      <ConfirmModal
        isOpen={cancelRequestModal.isOpen}
        data={{ title: "Are you sure?" }}
        onRejected={() => cancelRequestModal.setOpen(false)}
        onSuccess={cancelRequest}
      />
    </>
  );
};
