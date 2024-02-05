import { Types } from "mongoose";
import { MongoDocument } from "src/interfaces/document";

export interface VirtualUserDocument extends MongoDocument {
  username: string;
  bill: Types.ObjectId;
}
