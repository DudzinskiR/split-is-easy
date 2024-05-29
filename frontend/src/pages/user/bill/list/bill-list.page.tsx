import { useState } from "react";
import { useDispatch } from "react-redux";
import { LineBreak } from "src/components/line-break/line-break.component";
import { cancelRequest } from "src/features/account/account.slice";
import { useAccountHook } from "src/features/account/hook/account.hook";
import { useAPI } from "src/hooks/api/api.hook";
import { useNavbarList } from "src/hooks/navbar-list/navbar-list.hook";
import { useVisibilityToggle } from "src/hooks/visibility-toggle/visibility-toggle.hook";
import { AccountRequest } from "src/types/account/account-request.type";
import { API } from "src/utils/api/api";

import BillListButton from "./button/bill-list-button.component";
import BillListRequestButton from "./request-button/bill-list-request-button.component";
import { ConfirmModal } from "src/components/modal/modals/confirm-modal/confirm-modal.component";

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
