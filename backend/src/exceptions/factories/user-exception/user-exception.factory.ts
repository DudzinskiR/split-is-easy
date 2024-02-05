import { StatusCodes } from "http-status-codes";
import { ExceptionBuilder } from "../../exception-builder/exception-builder";

export class UserExceptionFactory {
  static createUserNotFoundException(userID: string) {
    return new ExceptionBuilder()
      .withName("User not found")
      .withMessage(`Not found user (${userID}) in bill`)
      .withHttpStatus(StatusCodes.NOT_FOUND)
      .withErrorCode("USE001")
      .build();
  }

  static createUserIDNotProvidedException() {
    return new ExceptionBuilder()
      .withName("User id not provided")
      .withHttpStatus(StatusCodes.BAD_REQUEST)
      .withErrorCode("USE002")
      .build();
  }
}
