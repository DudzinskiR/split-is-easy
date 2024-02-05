import { NextFunction, Request, Response } from "express";
import { BillExceptionFactory } from "src/exceptions";
import { BillModel } from "src/models";
import { createID } from "src/types";

export const getBill = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const billID = createID(req.params.billID);

  const bill = await BillModel.findById(billID).exec();

  if (!bill) {
    throw BillExceptionFactory.createBillNotFoundException(billID);
  }

  req.bill = bill;
  next();
};
