import { Route, Routes } from "react-router-dom";
import { BillListPage } from "src/pages/user/bill/list/bill-list.page";
import { NoAccessPage } from "src/pages/user/common/no-access/no-access.page";

import UserBillRoutes from "./bill/user-bill.route";
import InvitationRoutes from "./invitation/invitation.route";

const UserRoutes = () => {
  return (
    <Routes>
      <Route index element={<BillListPage />}></Route>
      <Route path="/bill">{UserBillRoutes()}</Route>
      <Route path="/inv">{InvitationRoutes()}</Route>
      <Route path="/no-access" element={<NoAccessPage />} />
      <Route path="*" element={<div>404</div>}></Route>
    </Routes>
  );
};

export default UserRoutes;
