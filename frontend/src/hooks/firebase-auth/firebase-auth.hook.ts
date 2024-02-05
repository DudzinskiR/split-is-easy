import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { FirebaseProviderID, UserStatus } from "src/enums";
import { setAccountStatus, setProviderID } from "src/features";
import { firebaseAuth } from "src/utils/firebase";
import { findValue } from "src/utils/helpers";

export const useFirebaseAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        const id = findValue(
          FirebaseProviderID,
          user.providerData[0].providerId,
          "UNKNOWN"
        );
        dispatch(setProviderID(id));
        dispatch(setAccountStatus(UserStatus.LOGGED));
      } else {
        dispatch(setAccountStatus(UserStatus.NOT_LOGGED));
      }
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
