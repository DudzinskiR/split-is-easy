import { ButtonColor } from "src/enums/button-color/button-color";
import { useAPI, useVisibilityToggle } from "src/hooks";
import { API } from "src/utils/api";
import { InvitationBoxTemplate } from "../template";
import { ConfirmModal } from "src/components/modal";

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
