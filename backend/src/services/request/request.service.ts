import { BillDocument, UserDocument } from "src/interfaces";
import { UserModel } from "src/models";
import { ID } from "src/types";
import { sendToSockets } from "src/utils/socket";

export class RequestService {
  static async getRequestsList(userID: ID) {
    const user = await UserModel.findById(userID)
      .populate<{ requests: BillDocument[] }>("requests")
      .orFail()
      .exec();

    const requests = user.requests.map((item) => {
      return {
        billName: item.name,
        billID: item.id,
      };
    });
    return requests;
  }

  static async cancelRequest(bill: BillDocument, user: UserDocument) {
    bill.requests = bill.requests.filter((item) => item.user !== user.id);
    if (bill.save) await bill.save();

    user.requests = user.requests.filter((item) => item.toString() !== bill.id);
    if (user.save) await user.save();

    sendToSockets(bill.admins, "BILL/ID/REQUEST/REJECT", {
      billID: bill.id,
      userID: user.id,
    });

    sendToSockets(user.id, "ACCOUNT/REQUEST/CANCEL", {
      billID: bill.id,
    });

    return { status: "ok" };
  }
}
