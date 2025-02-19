import { Navbar } from "src/components/Navbar/Navbar";
import { useAccountSocket } from "src/features/account/socket/useAccountSocket";
import { useBillSocket } from "src/features/bills/socket/useBillSocket";
import { useSocket } from "src/hooks/useSocket/useSocket";
import UserRoutes from "src/routes/UserRoutes/UserRoutes";

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
