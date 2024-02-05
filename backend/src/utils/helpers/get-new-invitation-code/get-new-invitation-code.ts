import { BillModel } from "src/models";
import { customAlphabet } from "src/utils/helpers";

export const getNewInvitationCode = async () => {
  const randomCode = customAlphabet(
    "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789",
    8
  );

  let code = "";
  let bills = [];
  do {
    code = randomCode();
    bills = await BillModel.find({
      "invitationConfig.code": code,
    }).exec();
  } while (bills.length !== 0);

  return code;
};
