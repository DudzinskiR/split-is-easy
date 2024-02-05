import { Navbar } from "src/components";
import { useAccountSocket, useBillSocket } from "src/features";
import { useSocket } from "src/hooks";
import UserRoutes from "src/routes/user-routes/user.route";

const UserLayout = () => {
  const { globalBillListener } = useBillSocket();
  const { globalAccountSockets } = useAccountSocket();
  useSocket([...globalBillListener, ...globalAccountSockets]);

  return (
    <>
      <Navbar />
      <div className="flex justify-center">
        <div className="max-w-7xl w-screen mb-5">
          <UserRoutes />
        </div>
      </div>
    </>
  );
};

export default UserLayout;
