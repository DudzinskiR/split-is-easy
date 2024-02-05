import { StatusCodes } from "http-status-codes";
import { ExceptionBuilder } from "../../exception-builder/exception-builder";

export class InvitationExceptionFactory {
  static createNotFoundException(invitationCode: string) {
    return new ExceptionBuilder()
      .withName(`Not found invitation with code (${invitationCode})`)
      .withHttpStatus(StatusCodes.NOT_FOUND)
      .withErrorCode("INV001")
      .build();
  }

  static createTypeException() {
    return new ExceptionBuilder()
      .withName("Not found")
      .withHttpStatus(StatusCodes.NOT_FOUND)
      .withErrorCode("INV002")
      .build();
  }

  static createInvitationHasBeenUsed() {
    return new ExceptionBuilder()
      .withName("Invitation has been used")
      .withHttpStatus(StatusCodes.NOT_FOUND)
      .withErrorCode("INV003")
      .build();
  }

  static createCodeNotProvidedException() {
    return new ExceptionBuilder()
      .withName("Invitation code not provided")
      .withHttpStatus(StatusCodes.BAD_REQUEST)
      .withErrorCode("INV004")
      .build();
  }
}
