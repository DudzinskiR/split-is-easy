import { spaceRegex, specialCharacterRegex } from "src/utils/regex";
import { BillName } from "./bill-name.type";

export const validBillName = (
  billNameLike: string
): billNameLike is BillName => {
  const minLength = 3;
  const maxLength = 26;
  if (typeof billNameLike !== "string") return false;
  if (billNameLike.length < minLength) return false;
  if (billNameLike.length > maxLength) return false;
  if (specialCharacterRegex().test(billNameLike)) return false;
  if (spaceRegex().test(billNameLike)) return false;
  if (billNameLike.startsWith(" ")) return false;
  if (billNameLike.endsWith(" ")) return false;

  return true;
};
