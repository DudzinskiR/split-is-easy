import { useDispatch } from "react-redux";
import { revertAll } from "src/features/revert-all";
import { signOutAccount } from "src/utils/firebase/firebase-helper";

import { useGlobalFlagContext } from "../global-flag/global-flag.hook";

export const useSignOut = () => {
  const dispatch = useDispatch();
  const { clearAllFlags } = useGlobalFlagContext();
  return () => {
    dispatch(revertAll());
    signOutAccount();
    clearAllFlags();
  };
};
