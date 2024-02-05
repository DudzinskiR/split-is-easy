import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { VirtualList } from "src/components";
import { acceptRequest, rejectRequest } from "src/features";
import { useUsersHook } from "src/features/users/hook";
import { useAPI, useExtraHight, useVisibilityToggle } from "src/hooks";
import { BillRequest } from "src/types";
import { API } from "src/utils/api";
import { BillUsersRequestRow } from "./row/bill-user-request-row.component";
import { ConfirmModal } from "src/components/modal";

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
