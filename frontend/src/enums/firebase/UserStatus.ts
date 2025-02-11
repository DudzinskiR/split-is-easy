export const UserStatus = {
  UNKNOWN: "UNKNOWN",
  NOT_LOGGED: "NOT_LOGGED",
  LOGGED: "LOGGED",
} as const;

export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];
