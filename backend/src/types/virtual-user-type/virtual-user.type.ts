import { ObjectId } from "mongoose";

export type VirtualUser = {
  username: string;
  id: ObjectId;
};
