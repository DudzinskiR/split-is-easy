import { spaceRegex } from "src/utils/regex/space/space-regex";
import { specialCharacterRegex } from "src/utils/regex/special-characters/special-characters-regex";

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
