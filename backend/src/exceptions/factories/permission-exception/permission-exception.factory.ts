import { StatusCodes } from "http-status-codes";
import { ExceptionBuilder } from "../../exception-builder/exception-builder";

export class PermissionExceptionFactory {
  static createUnauthorizedBillAccessException(billID: string) {
    return new ExceptionBuilder()
      .withName(`Unauthorized access`)
      .withMessage(`Unauthorized access to bill (${billID})`)
      .withHttpStatus(StatusCodes.UNAUTHORIZED)
      .withErrorCode("PER001")
      .build();
  }

  static createUserNotBillAdmin() {
    return new ExceptionBuilder()
      .withName(`Unauthorized access`)
      .withMessage(`User is not authorized as an account administrator`)
      .withHttpStatus(StatusCodes.UNAUTHORIZED)
      .withErrorCode("PER002")
      .build();
  }
}
