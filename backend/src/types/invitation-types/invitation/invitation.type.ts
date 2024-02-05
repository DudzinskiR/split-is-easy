import { ObjectId } from "mongoose";

export type Invitation = {
  user: ObjectId;
  date: Date;
};
