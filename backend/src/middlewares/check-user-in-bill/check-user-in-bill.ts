import { Request, Response, NextFunction } from "express";
import { PermissionExceptionFactory } from "src/exceptions";

export const checkUserInBill = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const users = req.bill?.users;
  const userID = req.user?.id;

  const result = users?.find((item) => {
    return item.toString() === userID;
  });

  if (!result) {
    throw PermissionExceptionFactory.createUnauthorizedBillAccessException(
      req.bill?.id
    );
  }

  next();
};
