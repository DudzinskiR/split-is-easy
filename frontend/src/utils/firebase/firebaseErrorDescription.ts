import { FirebaseAuthResponse } from "src/enums/firebase/FirebaseAuthResponse";

export const getFirebaseErrorDescription = (errorCode: string) => {
  return (
    firebaseErrorDescription.find((item) => item.code === errorCode)
      ?.description || "Other error"
  );
};

export const firebaseErrorDescription: {
  code: FirebaseAuthResponse;
  description: string;
}[] = [
  {
    code: FirebaseAuthResponse.EMAIL_EXISTS,
    description: "The provided email is already in use by an existing user",
  },
  {
    code: FirebaseAuthResponse.INVALID_EMAIL,
    description: "The provided value for the email is invalid",
  },
  {
    code: FirebaseAuthResponse.WEAK_PASSWORD,
    description: "The password is too weak",
  },
  {
    code: FirebaseAuthResponse.WRONG_PASSWORD,
    description: "The password is incorrect",
  },
  {
    code: FirebaseAuthResponse.MISSING_PASSWORD,
    description: "Missing password",
  },
  { code: FirebaseAuthResponse.USER_NOT_FOUND, description: "User not found" },
  { code: FirebaseAuthResponse.UID_EXISTS, description: "UID exist" },
  {
    code: FirebaseAuthResponse.INVALID_CREDENTIAL,
    description: "Wrong password",
  },
];
