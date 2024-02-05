import mongoose, { Schema } from "mongoose";
import { SplitType } from "src/enums";
import { PaymentDocument } from "src/interfaces";

const paymentSchema = new mongoose.Schema<PaymentDocument>(
  {
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    paidBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    participants: [
      {
        userID: { type: Schema.Types.ObjectId, ref: "User", required: true },
        auto: { type: Schema.Types.Boolean, required: true },
        value: { type: Schema.Types.Number, required: true },
      },
    ],
    splitType: {
      type: Schema.Types.String,
      enum: Object.values(SplitType),
      required: true,
    },
    billID: {
      type: Schema.Types.ObjectId,
      ref: "Bill",
      required: true,
    },
    isHidden: {
      type: Boolean,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const PaymentModel = mongoose.model("Payment", paymentSchema);
