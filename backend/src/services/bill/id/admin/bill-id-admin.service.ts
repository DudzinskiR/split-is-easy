import { ObjectId } from "mongodb";
import { BillExceptionFactory, UserExceptionFactory } from "src/exceptions";
import { BillName, ID, Username } from "src/types";
import { defaultResponse } from "src/utils/const";
import { getNewInvitationCode, PaymentCalculator } from "src/utils/helpers";
import { sendToSockets } from "src/utils/socket";
import {
  BillDocument,
  UserDocument,
  VirtualUserDocument,
} from "src/interfaces";
import {
  BillModel,
  PaymentModel,
  UserModel,
  VirtualUserModel,
} from "src/models";

export class BillIDAdminService {
  static async getBillAsAdmin(billID: ID) {
    const bill = await BillModel.findById(billID)
      .populate<{ users: UserDocument[] }>("users")
      .orFail()
      .exec();

    if (!bill) {
      throw BillExceptionFactory.createBillNotFoundException(billID);
    }

    const result = {
      invitationCode: bill.invitationConfig.code,
      requireAccept: bill.invitationConfig.requireAccept,
      requests: bill.requests.map((item) => {
        return { date: item.date, userID: item.user };
      }),
    };

    return result;
  }

  static async refreshInvitationCode(bill: BillDocument) {
    const newInvitationCode = await getNewInvitationCode();
    bill.invitationConfig.code = newInvitationCode;
    if (bill.save) await bill.save();

    sendToSockets(bill.admins, "BILL/ID/NEW_INV_CODE", {
      invitationCode: newInvitationCode,
      billID: bill.id,
    });
    return { code: newInvitationCode };
  }

  static async setRequireAccept(bill: BillDocument, value: boolean) {
    bill.invitationConfig.requireAccept = value;
    if (bill.save) await bill.save();

    sendToSockets(bill.admins, "BILL/ID/REQUIRE", {
      require: value,
      billID: bill.id,
    });

    return { require: value };
  }

  static async acceptRequest(bill: BillDocument, userID: ID) {
    bill.requests = bill.requests.filter(
      (item) => item.user.toString() !== userID
    );

    bill.users.push(new ObjectId(userID));

    const user = await UserModel.findById(userID).exec();
    if (!user) {
      throw UserExceptionFactory.createUserNotFoundException(userID);
    }
    user.requests = user.requests.filter((item) => item.toString() !== bill.id);
    user.bills.push(bill.id);

    if (bill.save) await bill.save();
    await user.save();

    sendToSockets(bill.admins, "BILL/ID/REQUEST/ACCEPT", {
      billID: bill.id,
      userID: userID,
    });

    sendToSockets(bill.users, "BILL/ID/USER_COUNT", {
      billID: bill.id,
      userCount: bill.users.length + bill.virtualUsers.length,
    });

    sendToSockets(user.id, "ACCOUNT/REQUEST/ACCEPT", {
      billID: bill.id,
      name: bill.name,
      userCount: bill.users.length + bill.virtualUsers.length,
      currency: bill.currency,
    });

    return { status: "ok" };
  }

  static async rejectRequest(bill: BillDocument, userID: ID) {
    bill.requests = bill.requests.filter(
      (item) => item.user.toString() !== userID
    );

    const user = await UserModel.findById(userID).exec();
    if (!user) {
      throw UserExceptionFactory.createUserNotFoundException(userID);
    }

    user.requests = user.requests.filter((item) => item.toString() !== bill.id);

    if (bill.save) await bill.save();
    await user.save();

    sendToSockets(bill.admins, "BILL/ID/REQUEST/REJECT", {
      billID: bill.id,
      userID: userID,
    });
    sendToSockets(userID, "ACCOUNT/REQUEST/CANCEL", {
      billID: bill.id,
    });
    return { status: "ok" };
  }

  static async addVirtualUser(billID: ID, username: Username) {
    const newVirtualUser = new VirtualUserModel<VirtualUserDocument>({
      username: username,
      bill: new ObjectId(billID),
    });

    await newVirtualUser.save();

    const bill = await BillModel.findByIdAndUpdate(billID, {
      $push: { virtualUsers: newVirtualUser },
    });

    if (!bill) {
      return;
    }

    sendToSockets(bill.users, "BILL/ID/VIRTUAL_USER/NEW", {
      billID: bill.id,
      userID: newVirtualUser.id,
    });

    sendToSockets(bill.users, "BILL/ID/USER_COUNT", {
      billID: bill.id,
      userCount: bill.users.length + bill.virtualUsers.length + 1,
    });

    return defaultResponse;
  }

  static async mergeVirtualUserToUser(
    bill: BillDocument,
    virtualUserID: ID,
    userID: ID
  ) {
    const payments = await PaymentModel.find({
      billID: bill.id,
    }).exec();

    const newPayments = payments
      .map((item) => {
        if (item.paidBy.toString() === virtualUserID) {
          item.paidBy = new ObjectId(userID);
        }
        return item;
      })
      .map((item) => {
        const userAmount = item.participants.find(
          (item) => item.userID.toString() === userID
        )?.value;
        const virtualUserAmount = item.participants.find(
          (item) => item.userID.toString() === virtualUserID
        )?.value;

        if (virtualUserAmount === undefined) {
          return item;
        }

        item.participants = item.participants.filter(
          (item) => item.userID.toString() !== virtualUserID
        );

        item.participants = item.participants.filter(
          (item) => item.userID.toString() !== userID
        );

        item.participants.push({
          userID: new ObjectId(userID),
          auto: false,
          value: (userAmount || 0) + virtualUserAmount,
        });

        return item;
      });
    const updates = newPayments.map((payment) => {
      return {
        updateOne: {
          filter: { _id: payment.id },
          update: {
            $set: {
              splitType: payment.splitType,
              paidBy: payment.paidBy,
              participants: payment.participants,
            },
          },
          upsert: true,
        },
      };
    });

    await PaymentModel.bulkWrite(updates);

    const paymentCalculator = new PaymentCalculator(
      [
        ...bill.users.map((item) => item.toString()),
        ...bill.virtualUsers.map((item) => item.id.toString()),
      ],
      newPayments
    );

    bill.transaction = paymentCalculator.getTransactions();
    bill.usersBalance = paymentCalculator.getBalance();
    bill.virtualUsers = bill.virtualUsers.filter(
      (item) => item.id.toString() !== virtualUserID
    );

    if (bill.save) await bill.save();

    sendToSockets(bill.users, "BILL/ID/USER/DELETE", {
      billID: bill.id,
      userID: virtualUserID,
    });

    sendToSockets(bill.users, "BILL/ID/BALANCE", {
      transaction: bill.transaction,
      balance: bill.usersBalance,
      billID: bill.id,
    });

    sendToSockets(bill.users, "BILL/ID/USER_COUNT", {
      billID: bill.id,
      userCount: bill.users.length + bill.virtualUsers.length,
    });

    return defaultResponse;
  }

  static async changeBillName(bill: BillDocument, billName: BillName) {
    bill.name = billName;
    if (bill.save) bill.save();

    sendToSockets(bill.users, "BILL/ID/NAME", {
      billName: billName,
      billID: bill.id,
    });
    return defaultResponse;
  }
}
