import { Route } from "react-router-dom";
import BillIDRoutes from "./bill-id/bill-id.route";
import { BillListPage } from "src/pages/user/bill/list/bill-list.page";

const UserBillRoutes = () => {
  return (
    <>
      <Route index element={<BillListPage />}></Route>
      <Route path=":billID">{BillIDRoutes()}</Route>
    </>
  );
};

export default UserBillRoutes;
