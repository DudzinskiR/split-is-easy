import { ValidationExceptionFactory } from "src/exceptions";
import { ID } from "./id.type";
import { validID } from "./id.validator";

export const createID = (idLike: string, name?: string) => {
  assertID(idLike, name);

  return idLike;
};

function assertID(idLike: string, name?: string): asserts idLike is ID {
  if (!validID(idLike)) {
    throw ValidationExceptionFactory.createInvalidValueException(
      `${idLike} is not correct ID ${name ? `(${name})` : ""}`
    );
  }
}
