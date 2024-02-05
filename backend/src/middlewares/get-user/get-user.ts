import { Request, Response, NextFunction } from "express";
import { getUserFromDB } from "src/utils/helpers";

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userData = await getUserFromDB(req.decodedToken);
  req.user = userData;
  next();
};
