import { Box } from "src/components/box/box.component";
import { Button } from "src/components/button/button.component";
import { Checkbox } from "src/components/inputs/checkbox/checkbox.component";
import { ConfirmModal } from "src/components/modal/modals/confirm-modal/confirm-modal.component";
import { ButtonColor } from "src/enums/button-color/button-color";
import { useBillsHook } from "src/features/bills/hook/bill.hook";
import { useAPI } from "src/hooks/api/api.hook";
import { useVisibilityToggle } from "src/hooks/visibility-toggle/visibility-toggle.hook";

import BillUsersRequestLink from "./link/bill-users-request-link.component";
import BillUsersRequestList from "./list/bill-user-request-list.component";

interface BillUsersRequestProps {
  billID: string;
}

const BillUsersRequest = ({ billID }: BillUsersRequestProps) => {
  const newLinkModal = useVisibilityToggle();
  const requireAcceptModal = useVisibilityToggle();
  const { getAdminBillData } = useBillsHook();
  const { post } = useAPI();

  const generateNewInvCode = async () => {
    post({
      url: `bill/${billID}/admin/refresh-code`,
      onFinally: () => newLinkModal.setOpen(false),
    });
  };

  const toggleRequire = async () => {
    post({
      url: `bill/${billID}/admin/require`,
      body: { require: !getAdminBillData(billID)?.requireAccept },
      onFinally: () => requireAcceptModal.setOpen(false),
    });
  };

  return (
    <>
      <Box title="Request" className="w-full lg:w-1/2 pb-5">
        <div className="text-center">
          <BillUsersRequestLink
            invCode={getAdminBillData(billID)?.invitationCode}
          />
          <div className="flex justify-center">
            <div className="flex flex-col gap-5 sm:flex-row items-center justify-around w-3/4">
              <Button
                text="Generate new link"
                className="h-10 w-52"
                color={ButtonColor.PURPLE}
                onClick={() => newLinkModal.setOpen(true)}
              />
              <div className="flex flex-row items-center gap-3">
                <div className="text-lg font-medium">Require acceptance</div>
                <Checkbox
                  onChange={() => {
                    requireAcceptModal.setOpen(true);
                  }}
                  checked={getAdminBillData(billID)?.requireAccept || false}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-5">
            <BillUsersRequestList
              requests={getAdminBillData(billID)?.requests}
            />
          </div>
        </div>
      </Box>
      <ConfirmModal
        isOpen={newLinkModal.isOpen}
        data={{
          title: "Are you sure?",
          description:
            "Generating a new link will make the previous link inactive",
        }}
        onRejected={() => newLinkModal.setOpen(false)}
        onSuccess={generateNewInvCode}
      />
      <ConfirmModal
        isOpen={requireAcceptModal.isOpen}
        data={{
          title: "Are you sure?",
          description:
            "After the change, each new user will be added to the bill",
        }}
        onRejected={() => requireAcceptModal.setOpen(false)}
        onSuccess={toggleRequire}
      />
    </>
  );
};

export default BillUsersRequest;
