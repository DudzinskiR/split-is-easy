import mongoose, { Schema } from "mongoose";
import { VirtualUserDocument } from "src/interfaces";

const virtualUserSchema = new mongoose.Schema<VirtualUserDocument>(
  {
    username: { type: String },
    bill: { type: Schema.Types.ObjectId, ref: "Bill" },
  },
  {
    timestamps: true,
  }
);

export const VirtualUserModel = mongoose.model<VirtualUserDocument>(
  "Virtual-User",
  virtualUserSchema
);
