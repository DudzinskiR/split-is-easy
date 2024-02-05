import { StatusCodes } from "http-status-codes";
import { ExceptionBuilder } from "../../exception-builder/exception-builder";

export class AdminExceptionFactory {
  static createLastAdminException() {
    return new ExceptionBuilder()
      .withName("Last admin in bill")
      .withMessage(
        "Cannot remove admin privileges. The user is the last administrator in the group"
      )
      .withHttpStatus(StatusCodes.FORBIDDEN)
      .withErrorCode("ADM001")
      .build();
  }

  static createSelfRemovalException() {
    return new ExceptionBuilder()
      .withName("Self removal")
      .withMessage(
        "You cannot remove yourself from the account. If you wish to leave the account, please use the 'Leave bill' in option page"
      )
      .withHttpStatus(StatusCodes.BAD_REQUEST)
      .withErrorCode("ADM002")
      .build();
  }
}
