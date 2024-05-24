import { useSelector } from "react-redux";
import { useFirebaseAuth } from "./hooks";
import { RootState } from "./features";
import { Suspense, lazy, useEffect } from "react";
import { socket } from "./utils/socket";
import { PublicLoadingScreen } from "./pages/loading/public-loading-screen/public-loading-screen";
import { UserLoadingScreen } from "./pages/loading/user-loading-screen/user-loading-screen";

const PublicLayout = lazy(() => import("./layouts/public/public.layout"));
const UserLayout = lazy(() => import("./layouts/user/user.layout"));

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

  if (userStatus === "UNKNOWN" && !localStorage.getItem("LOGGED")) {
    return (
      <Suspense fallback={<UserLoadingScreen />}>
        <PublicLayout />
      </Suspense>
    );
  }

  switch (userStatus) {
    case "LOGGED":
      return (
        <Suspense fallback={<UserLoadingScreen />}>
          <UserLayout />
        </Suspense>
      );
    case "NOT_LOGGED":
      return (
        <Suspense fallback={<PublicLoadingScreen />}>
          <PublicLayout />
        </Suspense>
      );
    case "UNKNOWN":
      return <UserLoadingScreen />;
  }
}

export default App;
