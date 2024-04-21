import { BillDocument, UserDocument } from "src/interfaces";
import { BillModel, UserModel } from "src/models";
import { BillName, CurrencyCode } from "src/types";
import { getNewInvitationCode } from "src/utils/helpers";
import { sendToSockets } from "src/utils/socket";

export class BillService {
  static async createNewBill(
    name: BillName,
    currency: CurrencyCode,
    user: UserDocument
  ) {
    const newBill = new BillModel<BillDocument>({
      name,
      currency,
      users: [user.id],
      virtualUsers: [],
      admins: [user.id],
      createdBy: user.id,
      invitationConfig: {
        code: await getNewInvitationCode(),
        requireAccept: true,
      },
      requests: [],
      payments: [],
      usersBalance: [],
      transaction: [],
    });

    await newBill.save();

    user.bills.push(newBill._id);
    if (user.save) user.save();

    sendToSockets(user.id, "ACCOUNT/BILL/NEW", {
      billID: newBill.id,
      billName: newBill.name,
      currencyCode: newBill.currency,
    });

    return { id: newBill._id };
  }

  static async getBillsList(user: UserDocument) {
    const userData = await UserModel.findById(user)
      .populate<{ bills: BillDocument[] }>("bills")
      .orFail()
      .exec();

    const bills = userData.bills.map((item) => {
      return {
        billID: item._id,
        name: item.name,
        balance:
          item.usersBalance.find(
            (item) => item.userID.toString() === user.id.toString()
          )?.value || 0,
        userCount: item.users.length + item.virtualUsers.length,
        currencyCode: item.currency,
      };
    });

    return bills;
  }
}
