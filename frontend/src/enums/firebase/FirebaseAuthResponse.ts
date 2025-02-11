export const FirebaseAuthResponse = {
  SUCCESS: "SUCCESS",
  UNKNOWN: "UNKNOWN",
  EMAIL_EXISTS: "auth/email-already-in-use",
  INVALID_EMAIL: "auth/invalid-email",
  WEAK_PASSWORD: "auth/weak-password",
  WRONG_PASSWORD: "auth/wrong-password",
  MISSING_PASSWORD: "auth/missing-password",
  USER_NOT_FOUND: "auth/user-not-found",
  UID_EXISTS: "auth/uid-already-exists",
  INVALID_CREDENTIAL: "auth/invalid-credential",
} as const;

export type FirebaseAuthResponse =
  (typeof FirebaseAuthResponse)[keyof typeof FirebaseAuthResponse];
