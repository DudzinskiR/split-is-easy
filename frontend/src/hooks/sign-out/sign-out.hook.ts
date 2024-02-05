import { useDispatch } from "react-redux";
import { revertAll } from "src/features";
import { useGlobalFlagContext } from "src/hooks";
import { signOutAccount } from "src/utils/firebase";

export const useSignOut = () => {
  const dispatch = useDispatch();
  const { clearAllFlags } = useGlobalFlagContext();
  return () => {
    dispatch(revertAll());
    signOutAccount();
    clearAllFlags();
  };
};
