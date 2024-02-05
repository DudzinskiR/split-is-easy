import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { findValue } from "../find-value";
import { FirebaseProviderID } from "src/enums";

export const getNewUsername = (decodedToken: DecodedIdToken) => {
  const providerID = findValue(
    FirebaseProviderID,
    decodedToken.firebase.sign_in_provider,
    FirebaseProviderID.UNKNOWN
  );

  return getName(providerID, decodedToken).slice(0, 32);
};

const getName = (
  provider: FirebaseProviderID,
  decodedToken: DecodedIdToken
) => {
  switch (provider) {
    case FirebaseProviderID.EMAIL:
      return getNameFromMail(decodedToken);
    case FirebaseProviderID.GOOGLE:
      return getNameFromGoogle(decodedToken);
    default:
      return getNameFromUID(decodedToken);
  }
};

const getNameFromGoogle = (decodedToken: DecodedIdToken) => {
  return decodedToken.name;
};

const getNameFromMail = (decodedToken: DecodedIdToken) => {
  return decodedToken.email?.split("@")[0];
};

const getNameFromUID = (decodedToken: DecodedIdToken) => {
  return decodedToken.uid.slice(0, 6);
};
