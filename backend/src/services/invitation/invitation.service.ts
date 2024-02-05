import { ObjectId } from "mongodb";
import { InvitationExceptionFactory } from "src/exceptions";
import { BillDocument, UserDocument } from "src/interfaces";
import { BillModel } from "src/models";
import { InvitationStatus } from "src/types";
import { sendToSockets } from "src/utils/socket";

export class InvitationService {
  static async getInvitation(
    invitationCode: string,
    user: UserDocument
  ): Promise<InvitationStatus> {
    const bill = await BillModel.findOne({
      "invitationConfig.code": invitationCode,
    }).exec();

    if (!bill)
      throw InvitationExceptionFactory.createNotFoundException(invitationCode);

    const isUserInBill = !!bill.users.find(
      (item) => item.toString() === user.id
    );

    const billInfo = {
      billName: bill.name,
      billID: bill.id,
    };
    if (isUserInBill) {
      return {
        status: "JOINED",
        ...billInfo,
      };
    }

    if (bill.requests.find((item) => item.user.toString() === user.id)) {
      return {
        status: "PENDING_APPROVAL",
        ...billInfo,
      };
    }

    if (bill.invitationConfig.requireAccept) {
      return {
        status: "REQUEST_POSSIBLE",
        ...billInfo,
      };
    } else {
      return {
        status: "JOIN_POSSIBLE",
        ...billInfo,
      };
    }
  }

  static async sendRequest(invitationCode: string, user: UserDocument) {
    const bill = await BillModel.findOne({
      "invitationConfig.code": invitationCode,
    }).exec();

    if (!bill)
      throw InvitationExceptionFactory.createNotFoundException(invitationCode);

    if (!bill.invitationConfig.requireAccept) {
      throw InvitationExceptionFactory.createTypeException();
    }

    if (bill.requests.find((item) => item.user.toString() === user.id)) {
      throw InvitationExceptionFactory.createInvitationHasBeenUsed();
    }

    if (user.requests.find((item) => item.toString() === bill._id)) {
      throw InvitationExceptionFactory.createInvitationHasBeenUsed();
    }

    bill.requests.push({ date: new Date(), user: user.id });
    await bill.save();

    user.requests.push(bill.id);
    if (user.save) user.save();

    sendToSockets(bill.admins, "BILL/ID/REQUEST/NEW", {
      billID: bill.id,
      userID: user.id,
      date: new Date(),
    });

    sendToSockets(user.id, "ACCOUNT/REQUEST/NEW", {
      billID: bill.id,
      billName: bill.name,
    });

    return { status: "ok" };
  }

  static async cancelRequest(bill: BillDocument, user: UserDocument) {
    if (!bill.requests.find((item) => item.user.toString() === user.id)) {
      throw InvitationExceptionFactory.createNotFoundException("");
    }

    if (!user.requests.find((item) => item.toString() === bill.id)) {
      throw InvitationExceptionFactory.createNotFoundException("");
    }

    user.requests = user.requests.filter((item) => item.toString() !== bill.id);
    if (user.save) await user.save();

    bill.requests = bill.requests.filter(
      (item) => item.user.toString() !== user.id
    );
    if (bill.save) await bill.save();

    sendToSockets(bill.admins, "BILL/ID/REQUEST/REJECT", {
      billID: bill.id,
      userID: user.id,
    });

    sendToSockets(user.id, "ACCOUNT/REQUEST/CANCEL", {
      billID: bill.id,
    });
    return { status: "ok" };
  }

  static async acceptInvitation(invitationCode: string, user: UserDocument) {
    const bill = await BillModel.findOne({
      "invitationConfig.code": invitationCode,
    }).exec();

    if (!bill)
      throw InvitationExceptionFactory.createNotFoundException(invitationCode);

    if (bill.invitationConfig.requireAccept) {
      throw InvitationExceptionFactory.createTypeException();
    }

    if (bill.requests.find((item) => item.user.toString() === user.id)) {
      throw InvitationExceptionFactory.createInvitationHasBeenUsed();
    }

    if (user.requests.find((item) => item.toString() === bill._id)) {
      throw InvitationExceptionFactory.createInvitationHasBeenUsed();
    }

    bill.users.push(new ObjectId(user.id));
    user.bills.push(new ObjectId(bill.id));

    if (bill.save) bill.save();
    if (user.save) user.save();

    sendToSockets(bill.admins, "BILL/ID/REQUEST/ACCEPT", {
      billID: bill.id,
      userID: user.id,
    });

    sendToSockets(bill.users, "BILL/ID/USER_COUNT", {
      billID: bill.id,
      userCount: bill.users.length + bill.virtualUsers.length,
    });

    return { billID: bill.id };
  }
}
