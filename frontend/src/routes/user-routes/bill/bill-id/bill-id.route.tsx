import { Route } from "react-router-dom";
import { BillSettingPage } from "src/pages/user/bill/setting/bill-setting.page";
import { BillSummaryPage } from "src/pages/user/bill/summary/bill-summary.page";
import { BillUsersPage } from "src/pages/user/bill/users/bill-users.page";

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
