import { Navbar } from "src/components/navbar/navbar.component";
import { useAccountSocket } from "src/features/account/socket/account.socket";
import { useBillSocket } from "src/features/bills/socket/bill.socket";
import { useSocket } from "src/hooks/socket/socket.hook";
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
