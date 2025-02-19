export const FirebaseProviderID = {
  UNKNOWN: "UNKNOWN",
  FACEBOOK: "facebook.com",
  MICROSOFT: "hotmail.com",
  TWITTER: "twitter.com",
  GITHUB: "github.com",
  GOOGLE: "google.com",
  APPLE: "apple.com",
  YAHOO: "yahoo.com",
  EMAIL: "password",
  PHONE: "phone",
} as const;

export type FirebaseProviderID =
  (typeof FirebaseProviderID)[keyof typeof FirebaseProviderID];
