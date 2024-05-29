import { User } from "src/types/user/user.type";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { revertAll } from "../revert-all";

const initialState = {
  users: {} as Record<string, string>,
};

export const usersSlice = createSlice({
  name: "USERS",
  initialState: initialState,
  extraReducers: (builder) => builder.addCase(revertAll, () => initialState),
  reducers: {
    setUsername: (state, action: PayloadAction<User>) => {
      state.users[action.payload.id] = action.payload.username;
    },
    setUsernames: (state, action: PayloadAction<User[]>) => {
      for (const item of action.payload) {
        state.users[item.id] = item.username;
      }
    },
  },
});

export const { setUsername, setUsernames } = usersSlice.actions;
