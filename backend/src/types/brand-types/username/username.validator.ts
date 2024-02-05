import { spaceRegex, specialCharacterRegex } from "src/utils/regex";
import { Username } from "./username.type";

export const validUsername = (
  usernameLike: string
): usernameLike is Username => {
  const minLength = 4;
  const maxLength = 26;

  if (usernameLike.length < minLength) return false;
  if (usernameLike.length > maxLength) return false;
  if (specialCharacterRegex().test(usernameLike)) return false;
  if (spaceRegex().test(usernameLike)) return false;
  if (usernameLike.startsWith(" ")) return false;
  if (usernameLike.endsWith(" ")) return false;

  return true;
};
