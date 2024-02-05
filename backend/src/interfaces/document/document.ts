import { Document } from "mongoose";

export interface MongoDocument extends Partial<Document> {
  createdAt?: Date;
  updatedAt?: Date;
}
