import { Types } from "mongoose";
import { MongoDocument } from "src/interfaces/document";

export interface UserDocument extends MongoDocument {
  authID: string;
  username: string;
  bills: Types.ObjectId[];
  requests: Types.ObjectId[];
}
