import { StatusCodes } from "http-status-codes";
import { ExceptionBuilder } from "../../exception-builder/exception-builder";

export class AuthExceptionFactory {
  static createAuthorizationException() {
    return new ExceptionBuilder()
      .withName("Unauthorized access")
      .withHttpStatus(StatusCodes.UNAUTHORIZED)
      .withErrorCode("AUT001")
      .build();
  }

  static createMissingTokenException() {
    return new ExceptionBuilder()
      .withName("Missing Token Error")
      .withHttpStatus(StatusCodes.BAD_REQUEST)
      .withErrorCode("AUT002")
      .build();
  }
}
