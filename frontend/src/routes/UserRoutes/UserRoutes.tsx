import { Route, Routes } from "react-router-dom";
import { BillListPage } from "src/pages/user/bill/list/BillListPage";
import { NoAccessPage } from "src/pages/user/common/noAccess/NoAccessPage";

import UserBillRoutes from "./UserBillRoutes/UserBillRoutes";
import InvitationRoutes from "./InvitationRoutes/InvitationRoutes";

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
