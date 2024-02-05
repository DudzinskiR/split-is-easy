import { ObjectId } from "mongodb";
import { BillDocument, PaymentDocument } from "src/interfaces";
import { BillModel, PaymentModel, UserModel } from "src/models";
import { createCurrencyCode, ID, TransactionBetweenUsers } from "src/types";
import { defaultResponse } from "src/utils/const";
import { PaymentCalculator } from "src/utils/helpers";
import { sendToSockets } from "src/utils/socket";
import {
  AdminExceptionFactory,
  BillExceptionFactory,
  UserExceptionFactory,
} from "src/exceptions";

export class BillIDAdminUserService {
  static async setUserAsAdmin(bill: BillDocument, userID: ID) {
    if (!bill.admins.find((item) => item.toString() === userID)) {
      bill.admins.push(new ObjectId(userID));
      if (bill.save) bill.save();
      sendToSockets(bill.users, "BILL/ID/USER/ADMIN", {
        userID: userID,
        billID: bill.id,
      });
    }

    return defaultResponse;
  }

  static async setUserAsRegular(bill: BillDocument, userID: ID) {
    if (bill.admins.find((item) => item.toString() === userID)) {
      if (bill.admins.length <= 1) {
        throw AdminExceptionFactory.createLastAdminException();
      }

      bill.admins = bill.admins.filter((item) => item.toString() !== userID);
      if (bill.save) bill.save();
      sendToSockets(bill.users, "BILL/ID/USER/NORMAL", {
        userID: userID,
        billID: bill.id,
      });
    }

    return defaultResponse;
  }

  static async removeUserFromBill(billID: ID, userID: ID) {
    const bill = await BillModel.findById(billID)
      .populate<{ payments: PaymentDocument[] }>("payments")
      .exec();

    if (!bill) {
      throw BillExceptionFactory.createBillNotFoundException(billID);
    }

    if (
      !bill.users.find((item) => item.toString() === userID) &&
      !bill.virtualUsers.find((item) => item._id.toString() === userID)
    ) {
      throw UserExceptionFactory.createUserNotFoundException(userID);
    }

    const userBalance =
      bill.usersBalance.find((item) => item.userID.toString() === userID)
        ?.value || 0;

    let transactions: TransactionBetweenUsers[] = [];
    if (userBalance > 0) {
      transactions = bill.transaction.filter(
        (item) => item.toUserID.toString() === userID
      );
    } else if (userBalance < 0) {
      transactions = bill.transaction.filter(
        (item) => item.fromUserID.toString() === userID
      );
    }

    const newPaymentsData = transactions.map<PaymentDocument>((item) => {
      const newPayment: PaymentDocument = {
        title: `DELETE USER (${userID}). TRANSFER FROM (${item.fromUserID}) TO (${item.toUserID})`,
        amount: item.amount,
        paidBy: new ObjectId(item.fromUserID),
        participants: [
          { userID: item.toUserID, value: item.amount, auto: true },
        ],
        splitType: "EQUAL",
        currency: createCurrencyCode(bill.currency),
        billID: new ObjectId(billID),
        isHidden: true,
      };

      return newPayment;
    });

    const newPayments = await PaymentModel.create(newPaymentsData);
    bill.payments.push(...newPayments);

    const usersID = [
      ...bill.users
        .map((item) => item.toString())
        .filter((item) => item !== userID),
      ...bill.virtualUsers
        .map((item) => item._id.toString())
        .filter((item) => item !== userID),
    ];
    const paymentCalculator = new PaymentCalculator(usersID, bill.payments);

    bill.transaction = paymentCalculator.getTransactions();
    bill.usersBalance = paymentCalculator.getBalance();
    const isNormalUser = bill.users.find(
      (item) => item._id.toString() === userID
    );

    if (isNormalUser) {
      bill.users = bill.users.filter((item) => item._id.toString() !== userID);
      await UserModel.updateOne(
        { _id: userID },
        { $pull: { bills: new ObjectId(billID) } }
      );
    } else {
      bill.virtualUsers = bill.virtualUsers.filter(
        (item) => item._id.toString() !== userID
      );
    }

    await bill.save();

    sendToSockets(bill.users, "BILL/ID/BALANCE", {
      transaction: bill.transaction,
      balance: bill.usersBalance,
      billID: bill.id,
    });

    sendToSockets(bill.users, "BILL/ID/USER/DELETE", {
      billID: bill.id,
      userID: userID,
    });

    sendToSockets(bill.users, "BILL/ID/USER_COUNT", {
      billID: bill.id,
      userCount: bill.users.length + bill.virtualUsers.length,
    });

    return defaultResponse;
  }
}
