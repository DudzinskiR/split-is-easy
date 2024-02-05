import { Request, Response, NextFunction } from "express";
import { AuthExceptionFactory } from "src/exceptions";
import { getDecodedToken } from "src/utils/helpers/get-decoded-token/get-decoded-token";

export const decodeToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authToken = req.headers.authorization;
  if (!authToken) {
    throw AuthExceptionFactory.createMissingTokenException();
  }

  const decodedToken = await getDecodedToken(authToken);
  req.decodedToken = decodedToken;
  next();
};
