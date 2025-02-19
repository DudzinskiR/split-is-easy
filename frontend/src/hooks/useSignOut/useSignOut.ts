import { useDispatch } from "react-redux";
import { revertAll } from "src/features/revertAll";
import { signOutAccount } from "src/utils/firebase/firebaseHelper";

import { useGlobalFlagContext } from "../useGlobalFlagContext/useGlobalFlagContext";

export const useSignOut = () => {
  const dispatch = useDispatch();
  const { clearAllFlags } = useGlobalFlagContext();
  return () => {
    dispatch(revertAll());
    signOutAccount();
    clearAllFlags();
  };
};
