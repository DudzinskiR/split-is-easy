import { ObjectId } from "mongodb";
import { SplitType } from "src/enums";
import { PaymentDocument, UserDocument } from "src/interfaces";
import { BillModel, PaymentModel } from "src/models";
import { defaultResponse } from "src/utils/const";
import { PaymentCalculator } from "src/utils/helpers";
import { sendToSockets } from "src/utils/socket";
import {
  BillExceptionFactory,
  PermissionExceptionFactory,
  UserExceptionFactory,
  ValidationExceptionFactory,
} from "src/exceptions";
import {
  CurrencyCode,
  ID,
  Participant,
  PaymentAmount,
  PaymentTitle,
} from "src/types";

export class PaymentService {
  static async saveNewPayment(data: {
    currency: CurrencyCode;
    paidBy: ID;
    billID: ID;
    title: PaymentTitle;
    amount: PaymentAmount;
    splitType: SplitType;
    participants: Participant[];
    user: UserDocument;
  }) {
    const bill = await BillModel.findById(data.billID).exec();
    if (!bill) {
      throw BillExceptionFactory.createBillNotFoundException(data.billID);
    }

    if (!bill.users.find((item) => item.toString() === data.user.id)) {
      throw PermissionExceptionFactory.createUnauthorizedBillAccessException(
        data.billID
      );
    }

    if (
      !(
        bill.users.find((item) => item.toString() === data.paidBy) ||
        bill.virtualUsers.find((item) => item._id.toString() === data.paidBy)
      )
    ) {
      throw UserExceptionFactory.createUserNotFoundException(data.paidBy);
    }

    for (const participant of data.participants) {
      if (
        !(
          bill.users.find((item) => item.toString() === participant.userID) ||
          bill.virtualUsers.find(
            (item) => item._id.toString() === participant.userID
          )
        )
      ) {
        throw UserExceptionFactory.createUserNotFoundException(
          participant.userID
        );
      }
    }

    let sumValues = 0;
    for (const participant of data.participants) {
      sumValues += participant.value;
    }

    if (Math.abs(sumValues - data.amount) > data.participants.length) {
      throw ValidationExceptionFactory.createInvalidValueException(
        "Payment amount is not valid"
      );
    }

    const newPaymentData: PaymentDocument = {
      title: data.title,
      amount: data.amount,
      currency: data.currency,
      splitType: data.splitType,
      paidBy: new ObjectId(data.paidBy),
      billID: new ObjectId(data.billID),
      participants: data.participants.map((item) => {
        return {
          userID: new ObjectId(item.userID),
          auto: item.auto,
          value: item.value,
        };
      }),
    };
    const newPayment = await PaymentModel.create(newPaymentData);

    const billPayments = await PaymentModel.find({ billID: bill.id }).exec();

    const usersID = [
      ...bill.users.map((item) => item.toString()),
      ...bill.virtualUsers.map((item) => item._id.toString()),
    ];

    const paymentCalculator = new PaymentCalculator(usersID, billPayments);

    bill.transaction = paymentCalculator.getTransactions();
    bill.usersBalance = paymentCalculator.getBalance();

    bill.payments.push(newPayment.id);
    await bill.save();
    newPaymentData.createdAt;

    sendToSockets(bill.users, "BILL/ID/PAYMENT/NEW", {
      ...newPaymentData,
      createdAt: newPayment.createdAt?.toISOString(),
      id: newPayment.id,
    });

    sendToSockets(bill.users, "BILL/ID/BALANCE", {
      transaction: bill.transaction,
      balance: bill.usersBalance,
      billID: bill.id,
    });

    return defaultResponse;
  }
}
