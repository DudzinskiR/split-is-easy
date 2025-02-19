import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "src/components/Button/Button";
import { SingleSelect } from "src/components/inputs/SingleSelect/SingleSelect";
import { ButtonColor } from "src/enums/ButtonColor/ButtonColor";
import { useBillsHook } from "src/features/bills/hook/useBillsHook";
import { useUsersHook } from "src/features/users/hook/useUsersHook";
import { useAPI } from "src/hooks/useAPI/useAPI";
import { useVisibilityToggle } from "src/hooks/useVisibilityToggle/useVisibilityToggle";
import { ModalWrapperProps } from "src/interfaces/modal/ModalWrapperProps";
import { SelectedOption } from "src/types/other/SelectedOption";

import { ModalWrapper } from "../../ModalWrapper";
import { ConfirmModal } from "../ConfirmModal/ConfirmModal";

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
