import { Exception } from "src/exceptions/exception";
import { Request, Response, NextFunction } from "express";
import { envConfig } from "src/utils/config";

export const exceptionHandler = async (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if ((error as Exception).httpStatus) {
    if (envConfig.NODE_ENV === "development")
      console.log("Exception: ", (error as Exception).toJSON());
    res
      .status((error as Exception).httpStatus)
      .json((error as Exception).toJSON());
  } else {
    if (envConfig.NODE_ENV === "development") console.log(error);
    res.status(500).json({ status: "error", message: "Unknown error" });
  }
};
