import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "src/components/button/button.component";
import { SingleSelect } from "src/components/inputs/single-select/single-select.component";
import { ButtonColor } from "src/enums/button-color/button-color";
import { useBillsHook } from "src/features/bills/hook/bill.hook";
import { useUsersHook } from "src/features/users/hook/user.hook";
import { useAPI } from "src/hooks/api/api.hook";
import { useVisibilityToggle } from "src/hooks/visibility-toggle/visibility-toggle.hook";
import { ModalWrapperProps } from "src/interfaces/modal/modal-wrapper-props.interface";
import { SelectedOption } from "src/types/other/selected-option.type";

import { ModalWrapper } from "../../modal-wrapper.component";
import { ConfirmModal } from "../confirm-modal/confirm-modal.component";

interface MergeVirtualUserModalProps extends ModalWrapperProps {
  virtualUserID: string;
  setOpen: (val: boolean) => void;
}

export const MergeVirtualUserModal = ({
  virtualUserID,
  setOpen,
  onRejected,
  ...wrapperProps
}: MergeVirtualUserModalProps) => {
  const [userID, setUserID] = useState<string | undefined>("");
  const [userOptions, setUserOptions] = useState<SelectedOption[]>([]);
  const confirmModal = useVisibilityToggle();
  const { billID } = useParams();
  const { put } = useAPI();
  const { getBillData } = useBillsHook();
  const { getUsername } = useUsersHook();

  useEffect(() => {
    const newUserOptions: SelectedOption[] = [];
    const bill = getBillData(billID);
    if (!bill) return;

    for (const user of bill.users) {
      if (user.type !== "VIRTUAL") {
        newUserOptions.push({
          id: user.id,
          value: getUsername(user.id),
        });
      }
    }
    setUserOptions(newUserOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getBillData(billID)?.users]);
  return (
    <>
      <ModalWrapper
        onRejected={() => {
          setUserID(undefined);
          if (onRejected) onRejected();
        }}
        {...wrapperProps}
        className="flex flex-col gap-5 items-center"
      >
        <div className="text-center text-2xl font-semibold">
          Merge virtual user to use
        </div>
        <SingleSelect
          options={userOptions}
          value={userID}
          onChange={(val) => setUserID(val)}
          label={`${userID ? `${getUsername(userID)}` : "select user"}`}
        />
        <Button
          text="Merge"
          color={ButtonColor.GREEN}
          className="w-32"
          disabled={!userID}
          onClick={() => confirmModal.setOpen(true)}
        />
      </ModalWrapper>
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        data={{
          title: "Are you sure?",
          description: (
            <div>
              After performing this action, all payments from
              <span className="font-bold"> {getUsername(virtualUserID)} </span>
              will be
              <span className="text-red-600 font-bold"> irreversibly </span>
              assigned to
              <span className="font-bold"> {getUsername(userID)} </span>
            </div>
          ),
        }}
        onRejected={() => confirmModal.setOpen(false)}
        onSuccess={() => {
          put({
            url: `/bill/${billID}/admin/virtual/${virtualUserID}`,
            body: { userID: userID },
            onFinally: () => {
              confirmModal.setOpen(false);
              setUserID(undefined);
              setOpen(false);
            },
          });
        }}
      />
    </>
  );
};
