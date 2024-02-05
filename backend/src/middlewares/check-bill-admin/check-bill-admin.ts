import { Request, Response, NextFunction } from "express";
import { PermissionExceptionFactory } from "src/exceptions";

export const checkBillAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const admins = req.bill?.admins;
  const user = req.user;

  const result = !!admins?.find((item) => item.toString() === user?.id);

  if (!result) {
    throw PermissionExceptionFactory.createUserNotBillAdmin();
  }

  next();
};
