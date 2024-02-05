import { Exception } from "../exception";

export class ExceptionBuilder {
  private exception: Exception;

  constructor() {
    this.exception = new Exception();
  }

  withName(name: string) {
    this.exception.setName(name);
    return this;
  }

  withMessage(message: string) {
    this.exception.setMessage(message);
    return this;
  }

  withHttpStatus(httpStatus: number) {
    this.exception.setHttpStatus(httpStatus);
    return this;
  }

  withErrorCode(errorCode: string) {
    this.exception.setErrorCode(errorCode);
    return this;
  }

  build() {
    if (!this.exception.message) {
      this.exception.setMessage(this.exception.name);
    }
    return this.exception;
  }
}
