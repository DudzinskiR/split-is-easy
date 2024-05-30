import { spaceRegex } from "src/utils/regex/space/space-regex";
import { specialCharacterRegex } from "src/utils/regex/special-characters/special-characters-regex";

export const isValidBillName = (billName: string) => {
  const minLength = 4;
  const maxLength = 26;

  if (billName.length < minLength) return false;
  if (billName.length > maxLength) return false;
  if (specialCharacterRegex().test(billName)) return false;
  if (spaceRegex().test(billName)) return false;
  if (billName.startsWith(" ")) return false;
  if (billName.endsWith(" ")) return false;

  return true;
};
