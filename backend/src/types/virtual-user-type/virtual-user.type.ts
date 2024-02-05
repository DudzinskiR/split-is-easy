import { ObjectId } from "mongoose";

export type VirtualUser = {
  username: string;
  _id: ObjectId;
};
