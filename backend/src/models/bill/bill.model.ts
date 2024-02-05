import mongoose, { Schema, Types } from "mongoose";
import { BillDocument } from "src/interfaces";

const billSchema = new mongoose.Schema<BillDocument>(
  {
    name: { type: String, required: true },
    currency: { type: String, required: true },
    users: [
      {
        type: Types.ObjectId,
        ref: "User",
        require: true,
      },
    ],
    virtualUsers: [
      {
        username: {
          type: String,
          required: true,
        },
      },
    ],
    admins: [
      {
        type: Types.ObjectId,
        ref: "User",
        require: true,
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    invitationConfig: {
      code: { type: String },
      requireAccept: { type: Boolean },
    },
    requests: [
      {
        user: { type: Types.ObjectId, ref: "User" },
        date: { type: Date },
      },
    ],
    payments: [{ type: Types.ObjectId, ref: "Payment" }],
    usersBalance: [
      {
        userID: { type: Types.ObjectId, ref: "User", required: true },
        value: { type: Number, required: true },
      },
    ],
    transaction: [
      {
        fromUserID: {
          type: Types.ObjectId,
          ref: "User",
          required: true,
        },
        toUserID: { type: Types.ObjectId, ref: "User", required: true },
        amount: { type: Number, require: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const BillModel = mongoose.model<BillDocument>("Bill", billSchema);
