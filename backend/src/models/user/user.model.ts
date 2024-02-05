import mongoose, { Schema } from "mongoose";
import { UserDocument } from "src/interfaces";

const userSchema = new mongoose.Schema<UserDocument>(
  {
    authID: { type: String, unique: true, require: true },
    username: { type: String },
    bills: [{ type: Schema.Types.ObjectId, ref: "Bill" }],
    requests: [{ type: Schema.Types.ObjectId, ref: "Bill" }],
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model<UserDocument>("User", userSchema);
