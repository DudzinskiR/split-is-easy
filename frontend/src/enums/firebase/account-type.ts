export const AccountType = {
  UNKNOWN: "UNKNOWN",
  GOOGLE: "GOOGLE",
  EMAIL: "EMAIL",
} as const;

export type AccountType = (typeof AccountType)[keyof typeof AccountType];
