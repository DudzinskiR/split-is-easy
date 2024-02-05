export class Exception extends Error {
  private _httpStatus = 500;
  private _errorCode = "ffffff";

  public get message() {
    return super.message;
  }

  public get httpStatus() {
    return this._httpStatus;
  }

  public get code() {
    return this._errorCode;
  }

  public setName(name: string) {
    super.name = name;
    return this;
  }

  public setMessage(message: string) {
    super.message = message;
    return this;
  }

  public setHttpStatus(status: number) {
    this._httpStatus = status;
    return this;
  }

  public setErrorCode(errorCode: string) {
    this._errorCode = errorCode;
    return this;
  }

  public toJSON() {
    let result: any = {
      status: "error",
      code: this._errorCode,
    };

    if (this.name) {
      result.name = this.name;
    }

    if (this.message) {
      result.message = this.message;
    }

    return result;
  }
}
