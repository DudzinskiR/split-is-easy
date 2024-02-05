import { useSelector } from "react-redux";
import { useFirebaseAuth } from "./hooks";
import { RootState } from "./features";
import { useEffect } from "react";
import { socket } from "./utils/socket";
import PublicLayout from "./layouts/public/public.layout";
import UserLayout from "./layouts/user/user.layout";

function App() {
  useFirebaseAuth();
  const userStatus = useSelector(
    (state: RootState) => state.account.userStatus
  );

  useEffect(() => {
    if (userStatus !== "LOGGED") return;
    socket.on("connect", () => console.log("connect to server"));
    socket.on("disconnect", () => console.log("disconnect from server"));

    socket.on("reconnection_attempt", () =>
      console.log("reconnection_attempt")
    );

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("reconnection_attempt");
    };
  }, [userStatus]);

  switch (userStatus) {
    case "LOGGED":
      return <UserLayout />;
    case "NOT_LOGGED":
      return <PublicLayout />;
    case "UNKNOWN":
      return (
        <div className="h-screen w-screen flex justify-center items-center text-4xl text-slate-700 font-medium">
          Loading...
        </div>
      );
  }
}

export default App;
