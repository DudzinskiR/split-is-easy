import { AuthExceptionFactory } from "src/exceptions";
import { firebaseAuth } from "src/utils/config";

export const getDecodedToken = async (token: string) => {
  const tokenID = token.split(" ")[1];

  if (!tokenID) {
    throw AuthExceptionFactory.createMissingTokenException();
  }

  try {
    const decodedToken = await firebaseAuth.verifyIdToken(tokenID);
    return decodedToken;
  } catch (e) {
    throw AuthExceptionFactory.createAuthorizationException();
  }
};
