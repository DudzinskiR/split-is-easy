import { Route } from "react-router-dom";
import InvitationPage from "src/pages/user/InvitationPage/InvitationPage";

const InvitationRoutes = () => {
  return (
    <>
      <Route path=":invID" element={<InvitationPage />}></Route>
    </>
  );
};

export default InvitationRoutes;
