import { StatusCodes } from "http-status-codes";
import { ExceptionBuilder } from "../../exception-builder/exception-builder";

export class BillExceptionFactory {
  static createBillNotFoundException(billID: string) {
    return new ExceptionBuilder()
      .withName("Bill not found")
      .withMessage(`Not found bill with id (${billID})`)
      .withHttpStatus(StatusCodes.NOT_FOUND)
      .withErrorCode("BIL001")
      .build();
  }

  static createBillIDNotProvidedException() {
    return new ExceptionBuilder()
      .withName("Bill id not provided")
      .withHttpStatus(StatusCodes.BAD_REQUEST)
      .withErrorCode("BIL002")
      .build();
  }

  static createBillIDInvalid(billID: string) {
    return new ExceptionBuilder()
      .withName("Invalid bill id")
      .withMessage(`Bill id is invalid (${billID})`)
      .withHttpStatus(StatusCodes.BAD_REQUEST)
      .withErrorCode("BIL003")
      .build();
  }

  static createUserNotFoundInBill() {
    return new ExceptionBuilder()
      .withName("User not found")
      .withMessage(`User not found in bill`)
      .withHttpStatus(StatusCodes.NOT_FOUND)
      .withErrorCode("BIL004")
      .build();
  }
}
