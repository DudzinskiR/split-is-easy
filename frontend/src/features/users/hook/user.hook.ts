import { useDispatch, useSelector } from "react-redux";
import { accountSlice } from "src/features/account/account.slice";
import { RootState } from "src/features/store";
import { useGlobalFlagContext } from "src/hooks/global-flag/global-flag.hook";
import { API } from "src/utils/api/api";
import { capitalizeFirstLetter } from "src/utils/helpers/capitalize-first-letter/capitalize-first-letter";

import { setUsername } from "../user.slice";

export const useUsersHook = () => {
  const users = useSelector((state: RootState) => state.users.users);
  const dispatch = useDispatch();
  const { getFlag, setFlag } = useGlobalFlagContext();

  const fetchUsername = async (userID: string) => {
    setFlag(userID, "FETCHING");
    try {
      const result = await API.get<{ username: string }>(`user/${userID}`);
      setFlag(userID, "FETCHED");

      if (result) {
        dispatch(
          setUsername({ id: userID, username: result.username, type: "NORMAL" })
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getUsername = (userID: string | undefined) => {
    if (
      userID === accountSlice.getInitialState().userID ||
      userID === undefined ||
      userID === "" ||
      typeof userID !== "string"
    ) {
      return "";
    }

    const username = users[userID];

    if (!username) {
      if (!getFlag(userID)) {
        fetchUsername(userID);
      }
    }

    return capitalizeFirstLetter(username) || "Loading...";
  };

  return { getUsername };
};
