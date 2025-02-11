import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { FirebaseProviderID } from "src/enums/firebase/FirebaseProviderID";
import { UserStatus } from "src/enums/firebase/UserStatus";
import {
  setAccountStatus,
  setProviderID,
} from "src/features/account/accountSlice";
import { firebaseAuth } from "src/utils/firebase/firebaseHelper";
import { findValue } from "src/utils/helpers/findValue/findValue";

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
