import { Route, Routes } from "react-router-dom";
import PublicHomePage from "src/pages/public/home/public-home.page";
import { PublicLoginPage } from "src/pages/public/login/public-login.page";

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
