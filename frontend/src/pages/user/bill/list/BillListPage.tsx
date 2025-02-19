import { useState } from "react";
import { useDispatch } from "react-redux";
import { LineBreak } from "src/components/LineBreak/LineBreak";
import { ConfirmModal } from "src/components/modal/modals/ConfirmModal/ConfirmModal";
import { cancelRequest } from "src/features/account/accountSlice";
import { useAccountHook } from "src/features/account/hook/useAccountHook";
import { useAPI } from "src/hooks/useAPI/useAPI";
import { useNavbarList } from "src/hooks/useNavbarList/useNavbarList";
import { useVisibilityToggle } from "src/hooks/useVisibilityToggle/useVisibilityToggle";
import { AccountRequest } from "src/types/account/AccountRequest";
import { API } from "src/utils/api/api";

import BillListButton from "./button/BillListButton";
import BillListRequestButton from "./BillListRequestButton/BillListRequestButton";

export const BillListPage = () => {
  const { getBillsList, getRequestList } = useAccountHook();
  const cancelRequestModal = useVisibilityToggle();
  const [selectedRequest, setSelectedRequest] = useState<AccountRequest>();
  const dispatch = useDispatch();
  const { del } = useAPI();
  useNavbarList([]);

  const cancelRequestCallback = () => {
    del({
      url: `request/${selectedRequest?.billID}`,
      onSuccess: (res) => {
        if (API.isOk(res)) {
          dispatch(cancelRequest({ billID: selectedRequest?.billID || "" }));
        }
      },
    });
  };

  return (
    <>
      <div className="flex flex-col">
        <LineBreak text="Bills" className="mt-3" />
        <div className="grid grid-cols-1 gap-5 pb-5 md:grid-cols-2 mt-5 mx-2 md:mx-5">
          {getBillsList().map((item) => (
            <BillListButton
              key={item.billID}
              billID={item.billID}
              usersNumber={item.userCount}
              billName={item.name}
              userBalance={item.balance}
              currencyCode={item.currencyCode}
            />
          ))}
        </div>
        {getRequestList().length > 0 && (
          <>
            <LineBreak text="Requests" />
            <div className="grid grid-cols-1 gap-5 pb-5 md:grid-cols-2 mt-5 mx-2 md:mx-5">
              {getRequestList().map((item) => (
                <BillListRequestButton
                  key={item.billID}
                  billName={item.billName}
                  onClick={() => {
                    cancelRequestModal.setOpen(true);
                    setSelectedRequest(item);
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <ConfirmModal
        isOpen={cancelRequestModal.isOpen}
        data={{
          title: "Are you sure?",
          description: ` Are you sure you want to cancel this request to join "${selectedRequest?.billName}" bill?`,
        }}
        onRejected={() => cancelRequestModal.setOpen(false)}
        onSuccess={cancelRequestCallback}
      />
    </>
  );
};
