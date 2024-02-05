import { StatusCodes } from "http-status-codes";
import { ExceptionBuilder } from "../../exception-builder/exception-builder";

export class ValidationExceptionFactory {
  static createInvalidValueException(message?: string) {
    return new ExceptionBuilder()
      .withName("Invalid Value")
      .withMessage(message || "")
      .withHttpStatus(StatusCodes.BAD_REQUEST)
      .withErrorCode("VAL001")
      .build();
  }
}
