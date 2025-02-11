import { Route, Routes } from "react-router-dom";
import PublicHomePage from "src/pages/public/home/PublicHomePage";
import { PublicLoginPage } from "src/pages/public/login/PublicLoginPage";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route index element={<PublicHomePage />}></Route>
      <Route path={"*"} element={<PublicHomePage />} />
      <Route path={"/login"} element={<PublicLoginPage />} />
    </Routes>
  );
};

export default PublicRoutes;
