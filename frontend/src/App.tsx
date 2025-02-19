import { useSelector } from "react-redux";
import { Suspense, lazy, useEffect } from "react";
import { PublicLoadingScreen } from "./pages/loading/PublicLoadingScreen/PublicLoadingScreen";
import { UserLoadingScreen } from "./pages/loading/UserLoadingScreen/UserLoadingScreen";
import { useFirebaseAuth } from "./hooks/useFirebaseAuth/useFirebaseAuth";
import { RootState } from "./features/store";
import { socket } from "./utils/socket/socket";

const PublicLayout = lazy(() => import("./layouts/public/PublicLayout"));
const UserLayout = lazy(() => import("./layouts/user/UserLayout"));

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
