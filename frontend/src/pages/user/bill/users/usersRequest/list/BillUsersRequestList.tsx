import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { ConfirmModal } from "src/components/modal/modals/ConfirmModal/ConfirmModal";
import { VirtualList } from "src/components/VirtualList/VirtualList";
import { acceptRequest, rejectRequest } from "src/features/bills/billsSlice";
import { useUsersHook } from "src/features/users/hook/useUsersHook";
import { useAPI } from "src/hooks/useAPI/useAPI";
import { useExtraHight } from "src/hooks/useExtraHight/useExtraHight";
import { useVisibilityToggle } from "src/hooks/useVisibilityToggle/useVisibilityToggle";
import { BillRequest } from "src/types/bill/BillRequest";
import { API } from "src/utils/api/api";

import { BillUsersRequestRow } from "./row/BillUsersRequestRow";

interface BillUsersRequestListProps {
  requests: BillRequest[] | undefined;
}

const BillUsersRequestList = ({ requests }: BillUsersRequestListProps) => {
  const [selectedRequest, setSelectedRequest] = useState<BillRequest>();

  const { getExtraHeights, updateExtraHeight, calcExtraHeight } =
    useExtraHight();

  const acceptModal = useVisibilityToggle();
  const rejectModal = useVisibilityToggle();
  const { billID } = useParams();
  const dispatch = useDispatch();
  const { getUsername } = useUsersHook();
  const { put } = useAPI();
  if (!requests) return <></>;

  const openAcceptModal = (request: BillRequest) => () => {
    setSelectedRequest(request);
    acceptModal.setOpen(true);
  };

  const openRejectModal = (request: BillRequest) => () => {
    setSelectedRequest(request);
    rejectModal.setOpen(true);
  };

  const saveAcceptRequest = (billID: string, userID: string) => {
    put({
      url: `bill/${billID}/admin/accept`,
      body: { userID: userID },
      onSuccess: (res) => {
        if (API.isOk(res)) {
          dispatch(acceptRequest({ billID, userID }));
        }
      },
    });
  };

  const saveRejectRequest = (billID: string, userID: string) => {
    put({
      url: `bill/${billID}/admin/reject`,
      body: { userID: userID },
      onSuccess: (res) => {
        if (API.isOk(res)) {
          dispatch(rejectRequest({ billID, userID }));
        }
      },
    });
  };

  return (
    <>
      <div className="w-10/12">
        <VirtualList
          extraHeight={getExtraHeights()}
          rowElement={(index, style) => (
            <BillUsersRequestRow
              resizeCallback={(val) => updateExtraHeight(val, index)}
              key={requests[index].userID}
              request={requests[index]}
              style={style}
              onAccept={openAcceptModal(requests[index])}
              onReject={openRejectModal(requests[index])}
            />
          )}
          height={Math.min(360, requests.length * 60 + calcExtraHeight())}
          itemCount={requests.length}
          itemHeight={60}
        />
      </div>
      <ConfirmModal
        isOpen={acceptModal.isOpen}
        data={{
          title: "Are you sure?",
          description: `This action will add ${getUsername(
            selectedRequest?.userID
          )} to your bill`,
        }}
        onSuccess={() => {
          saveAcceptRequest(billID!, selectedRequest?.userID || "");
          acceptModal.setOpen(false);
        }}
        onRejected={() => {
          acceptModal.setOpen(false);
        }}
      />
      <ConfirmModal
        isOpen={rejectModal.isOpen}
        data={{
          title: "Are you sure?",
          description: `This action will reject the request sent by ${getUsername(
            selectedRequest?.userID
          )}`,
        }}
        onSuccess={() => {
          saveRejectRequest(billID!, selectedRequest?.userID || "");
          rejectModal.setOpen(false);
        }}
        onRejected={() => {
          rejectModal.setOpen(false);
        }}
      />
    </>
  );
};

export default BillUsersRequestList;
