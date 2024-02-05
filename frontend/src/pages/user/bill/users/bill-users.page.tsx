import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState, useBillsHook } from "src/features";
import { useDocumentTitle, useNavbarList } from "src/hooks";
import { billPageNavbarData } from "src/utils/navbar-list";
import { BillUsersList } from "./users-list/bill-users-list-box.component";
import BillUsersRequest from "./users-request/bill-users-request.component";

export const BillUsersPage = () => {
  const { billID } = useParams();
  const userID = useSelector((state: RootState) => state.account.userID);
  useNavbarList(billPageNavbarData, 2, { key: ":billID", value: billID! });
  const { getBillData, checkAdminStatus } = useBillsHook();
  useDocumentTitle(`${getBillData(billID)?.name || "loading"} - users`, [
    getBillData(billID),
  ]);

  if (!getBillData(billID!)) {
    return <></>;
  }

  return (
    <div className="w-full">
      <div className="flex lg:flex-row justify-center flex-col mt-5 gap-5 px-5">
        <BillUsersList isAdmin={checkAdminStatus(billID!, userID)} />

        {checkAdminStatus(billID!, userID) && (
          <BillUsersRequest billID={billID!} />
        )}
      </div>
    </div>
  );
};
