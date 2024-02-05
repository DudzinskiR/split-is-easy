import { ValidationExceptionFactory } from "src/exceptions";
import { Username } from "./username.type";
import { validUsername } from "./username.validator";

export const createUsername = (usernameLike: string) => {
  assertUsername(usernameLike);

  return usernameLike;
};

function assertUsername(
  usernameLike: string
): asserts usernameLike is Username {
  if (!validUsername(usernameLike)) {
    throw ValidationExceptionFactory.createInvalidValueException(
      `${usernameLike} is not correct username`
    );
  }
}
