import { ObjectId } from "mongodb";
import { BillExceptionFactory } from "src/exceptions";
import { BillModel, PaymentModel, UserModel } from "src/models";
import { defaultResponse } from "src/utils/const";
import { PaymentCalculator } from "src/utils/helpers";
import { sendToSockets } from "src/utils/socket";
import {
  PaymentDocument,
  UserDocument,
  VirtualUserDocument,
} from "src/interfaces";
import {
  createCurrencyCode,
  ID,
  TransactionBetweenUsers,
  User,
} from "src/types";

export class BillIDService {
  static async getBill(billID: ID) {
    const bill = await BillModel.findById(billID)
      .populate<{ users: UserDocument[] }>("users")
      .populate<{ virtualUsers: VirtualUserDocument[] }>("virtualUsers")
      .exec();

    if (!bill) {
      throw BillExceptionFactory.createBillNotFoundException(billID);
    }

    const usersList: User[] = [];
    usersList.push(
      ...bill.users.map<User>((item) => {
        const type = !!bill.admins.find(
          (admin) => admin.toString() === item.id.toString()
        )
          ? "ADMIN"
          : "NORMAL";

        return { id: item.id, username: item.username, type: type };
      }),
      ...bill.virtualUsers.map<User>((item) => {
        return { id: item.id, username: item.username, type: "VIRTUAL" };
      })
    );

    const result = {
      id: bill.id,
      currency: bill.currency,
      users: usersList,
      admins: bill.admins,
      transaction: bill.transaction.map((item) => {
        return {
          fromUserID: item.fromUserID,
          toUserID: item.toUserID,
          amount: item.amount,
        };
      }),
      usersBalance: bill.usersBalance.map((item) => {
        return { userID: item.userID, value: item.value };
      }),
      name: bill.name,
    };

    return result;
  }

  static async getPayment(billID: ID) {
    const bill = await BillModel.findById(billID)
      .populate<{ payments: PaymentDocument[] }>("payments")
      .exec();

    if (!bill) {
      throw BillExceptionFactory.createBillNotFoundException(billID);
    }

    const payments = bill.payments
      .filter((item) => !item.isHidden)
      .sort(
        (a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
      )
      .map((item) => {
        return {
          id: item.id,
          title: item.title,
          amount: item.amount,
          paidBy: item.paidBy,
          splitType: item.splitType,
          participants: item.participants,
          createdAt: item.createdAt,
        };
      });
    return payments;
  }

  static async leaveBill(billID: ID, user: UserDocument) {
    const bill = await BillModel.findById(billID)
      .populate<{ payments: PaymentDocument[] }>("payments")
      .exec();

    if (!bill) {
      throw BillExceptionFactory.createBillNotFoundException(billID);
    }

    const userID = user.id;

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
        .map((item) => item.id.toString())
        .filter((item) => item !== userID),
    ];
    const paymentCalculator = new PaymentCalculator(usersID, bill.payments);

    bill.transaction = paymentCalculator.getTransactions();
    bill.usersBalance = paymentCalculator.getBalance();

    bill.users = bill.users.filter((item) => item.id.toString() !== userID);
    await UserModel.updateOne(
      { _id: userID },
      { $pull: { bills: new ObjectId(billID) } }
    );

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
