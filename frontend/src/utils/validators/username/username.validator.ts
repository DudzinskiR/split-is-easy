import { spaceRegex, specialCharacterRegex } from "src/utils/regex";

export const isValidUsername = (username: string) => {
  const minLength = 4;
  const maxLength = 26;

  if (username.length < minLength) return false;
  if (username.length > maxLength) return false;
  if (specialCharacterRegex().test(username)) return false;
  if (spaceRegex().test(username)) return false;
  if (username.startsWith(" ")) return false;
  if (username.endsWith(" ")) return false;

  return true;
};
