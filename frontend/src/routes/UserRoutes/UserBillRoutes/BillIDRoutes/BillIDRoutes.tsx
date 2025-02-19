import { Route } from "react-router-dom";
import { BillSettingPage } from "src/pages/user/bill/setting/BillSettingPage";
import { BillSummaryPage } from "src/pages/user/bill/summary/BillSummaryPage";
import { BillUsersPage } from "src/pages/user/bill/users/BillUsersPage";

const BillIDRoutes = () => {
  return (
    <>
      <Route index element={<BillSummaryPage />}></Route>
      <Route path="users" element={<BillUsersPage />}></Route>
      <Route path="setting" element={<BillSettingPage />}></Route>
    </>
  );
};

export default BillIDRoutes;
