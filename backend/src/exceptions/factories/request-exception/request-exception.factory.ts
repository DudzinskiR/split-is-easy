import { StatusCodes } from "http-status-codes";
import { ExceptionBuilder } from "../../exception-builder/exception-builder";

export class RequestExceptionFactory {
  static createUserNotFound(userID: string) {
    return new ExceptionBuilder()
      .withName("User request not found")
      .withMessage(`Not found request send by user with id (${userID})`)
      .withHttpStatus(StatusCodes.NOT_FOUND)
      .withErrorCode("REQ001")
      .build();
  }
}
