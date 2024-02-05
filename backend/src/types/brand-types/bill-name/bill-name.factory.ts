import { ValidationExceptionFactory } from "src/exceptions";
import { BillName } from "./bill-name.type";
import { validBillName } from "./bill-name.validator";

export const createBillName = (billNameLike: string) => {
  assertBillName(billNameLike);

  return billNameLike;
};

function assertBillName(
  billNameLike: string
): asserts billNameLike is BillName {
  if (!validBillName(billNameLike)) {
    throw ValidationExceptionFactory.createInvalidValueException(
      `${billNameLike} is not correct bill name`
    );
  }
}
