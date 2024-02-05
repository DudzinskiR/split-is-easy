import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import mongoose from "mongoose";

import { getNewUsername } from "../get-new-username";
import { UserDocument } from "src/interfaces";
import { UserModel } from "src/models";

export const getUserFromDB = async (decodedToken: DecodedIdToken) => {
  const session = await mongoose.startSession();
  const authID = decodedToken.uid;
  let userData: UserDocument | undefined = undefined;
  try {
    await session.withTransaction(async () => {
      const existingUser = await UserModel.findOne({ authID }).session(session);
      if (existingUser) {
        userData = existingUser;
      } else {
        const newUser = new UserModel<UserDocument>({
          authID: authID,
          bills: [],
          username: getNewUsername(decodedToken),
          requests: [],
        });
        await newUser.save({ session });
        userData = newUser;
      }
    });
  } catch (e) {
    throw e;
  } finally {
    await session.endSession();
  }

  return userData as unknown as UserDocument;
};
