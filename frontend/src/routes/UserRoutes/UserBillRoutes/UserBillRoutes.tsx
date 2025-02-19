import { Route } from "react-router-dom";
import BillIDRoutes from "./BillIDRoutes/BillIDRoutes";
import { BillListPage } from "src/pages/user/bill/list/BillListPage";

const UserBillRoutes = () => {
  return (
    <>
      <Route index element={<BillListPage />}></Route>
      <Route path=":billID">{BillIDRoutes()}</Route>
    </>
  );
};

export default UserBillRoutes;
UserBillRoutes;
