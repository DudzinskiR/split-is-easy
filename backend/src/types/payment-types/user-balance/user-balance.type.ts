import { Types } from "mongoose";

export interface UserBalance {
  userID: Types.ObjectId;
  value: number;
}
