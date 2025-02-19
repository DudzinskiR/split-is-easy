import { useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "src/components/Box/Box";
import { Button } from "src/components/Button/Button";
import { AddVirtualUserModal } from "src/components/modal/modals/AddVirtualUserModal/AddVirtualUserModal";
import { ConfirmModal } from "src/components/modal/modals/ConfirmModal/ConfirmModal";
import { MergeVirtualUserModal } from "src/components/modal/modals/MergeVirtualUserModal/MergeVirtualUserModal";
import { VirtualList } from "src/components/VirtualList/VirtualList";
import { ButtonColor } from "src/enums/ButtonColor/ButtonColor";
import { useBillsHook } from "src/features/bills/hook/useBillsHook";
import { useUsersHook } from "src/features/users/hook/useUsersHook";
import { useAPI } from "src/hooks/useAPI/useAPI";
import { useExtraHight } from "src/hooks/useExtraHight/useExtraHight";
import { useVisibilityToggle } from "src/hooks/useVisibilityToggle/useVisibilityToggle";

import BillUsersListRow from "./row/BillUsersListRow";

interface BillUsersListProps {
  isAdmin: boolean;
}

export const BillUsersList = ({ isAdmin }: BillUsersListProps) => {
  const [selectedUserID, setSelectedUserID] = useState<string>();
  const { getBillData } = useBillsHook();
  const { getUsername } = useUsersHook();

  const { getExtraHeights, updateExtraHeight, calcExtraHeight } =
    useExtraHight();
  const { put, del } = useAPI();
  const setAsAdminModal = useVisibilityToggle();
  const setAsUserModal = useVisibilityToggle();
  const removeFromBillModal = useVisibilityToggle();
  const addVirtualUserModal = useVisibilityToggle();
  const mergeVirtualUserModal = useVisibilityToggle();

  const { billID } = useParams();

  const renderUsersList = () => {
    const billData = getBillData(billID);
    if (!billData) return;
    return (
      <VirtualList
        extraHeight={getExtraHeights()}
        rowElement={(index, style) => {
          const userID = billData.users[index].id;
          return (
            <BillUsersListRow
              resizeCallback={(val) => {
                updateExtraHeight(val, index);
              }}
              key={userID}
              billData={billData}
              style={style}
              user={billData.users[index]}
              userBalance={billData.usersBalance.find(
                (item) => item.userID === userID
              )}
              isAdmin={isAdmin}
              removeUser={() => {
                setSelectedUserID(userID);
                removeFromBillModal.setOpen(true);
              }}
              setUserAsUser={() => {
                setSelectedUserID(userID);
                setAsUserModal.setOpen(true);
              }}
              setUserAsAdmin={() => {
                setSelectedUserID(userID);
                setAsAdminModal.setOpen(true);
              }}
              mergeVirtualUser={() => {
                setSelectedUserID(userID);
                mergeVirtualUserModal.setOpen(true);
              }}
            />
          );
        }}
        height={Math.min(billData.users.length * 60 + calcExtraHeight(), 600)}
        itemCount={billData.users.length}
        itemHeight={60}
      />
    );
  };

  const renderModal = () => {
    return (
      <>
        <ConfirmModal
          isOpen={setAsAdminModal.isOpen}
          onRejected={() => setAsAdminModal.setOpen(false)}
          onSuccess={() => {
            put({
              url: `bill/${billID}/admin/user/${selectedUserID}/admin`,
              onSuccess: () => {
                setAsAdminModal.setOpen(false);
              },
            });
          }}
          data={{
            title: "Are you sure?",
            description: (
              <>
                By confirming, you are granting to
                <b> {getUsername(selectedUserID)}</b>, full administrator
                access. This includes the ability to delete payments and manage
                other users
              </>
            ),
          }}
        />
        <ConfirmModal
          isOpen={setAsUserModal.isOpen}
          onRejected={() => setAsUserModal.setOpen(false)}
          onSuccess={() => {
            put({
              url: `bill/${billID}/admin/user/${selectedUserID}/regular`,
              onSuccess: () => {
                setAsUserModal.setOpen(false);
              },
            });
          }}
          data={{
            title: "Are you sure?",
            description: (
              <>
                By confirming, <b>{getUsername(selectedUserID)}</b> will lose
                administrator privileges. Are you sure you want to proceed?
              </>
            ),
          }}
        />
        <ConfirmModal
          isOpen={removeFromBillModal.isOpen}
          onRejected={() => removeFromBillModal.setOpen(false)}
          onSuccess={() => {
            del({
              url: `/bill/${billID}/admin/user/${selectedUserID}`,
              onSuccess: () => {
                removeFromBillModal.setOpen(false);
              },
            });
          }}
          data={{
            title: "Are you sure?",
            description: (
              <>
                Are you sure you want to remove
                <b> "{getUsername(selectedUserID)}"</b>. This action is
                <b className="text-red-600"> irreversible</b>. After confirm,
                this user will be permanently removed from the bill, and all
                associated dependencies will be settled
              </>
            ),
          }}
        />
        <AddVirtualUserModal
          isOpen={addVirtualUserModal.isOpen}
          onRejected={() => addVirtualUserModal.setOpen(false)}
          setOpen={addVirtualUserModal.setOpen}
        />
        <MergeVirtualUserModal
          isOpen={mergeVirtualUserModal.isOpen}
          virtualUserID={selectedUserID!}
          onRejected={() => {
            mergeVirtualUserModal.setOpen(false);
          }}
          setOpen={mergeVirtualUserModal.setOpen}
        />
      </>
    );
  };

  return (
    <>
      <Box title="Users" className="w-full lg:w-1/2 relative">
        {isAdmin && (
          <div className="absolute top-[11px] right-4">
            <Button
              className="h-8"
              color={ButtonColor.GREEN}
              text="Add virtual users"
              onClick={() => addVirtualUserModal.setOpen(true)}
            />
          </div>
        )}
        {renderUsersList()}
      </Box>
      {isAdmin && renderModal()}
    </>
  );
};
