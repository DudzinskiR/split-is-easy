export type User = {
  id: string;
  username: string;
  type: UserType;
};

export type UserType = "NORMAL" | "ADMIN" | "VIRTUAL";

export type UserData = {
  id: string;
  name: string;
};
