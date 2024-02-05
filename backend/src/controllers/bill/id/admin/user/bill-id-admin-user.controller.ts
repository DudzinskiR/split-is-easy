import { Request, Response } from "express";
import { BillIDAdminUserService } from "src/services";
import { createID } from "src/types";

export class BillIDAdminUserController {
  static async setUserAsAdmin(req: Request, res: Response) {
    const userID = req.params.userID;
    const result = await BillIDAdminUserService.setUserAsAdmin(
      req.bill!,
      createID(userID)
    );
    res.send(result);
  }

  static async setUserAsRegular(req: Request, res: Response) {
    const userID = req.params.userID;
    const result = await BillIDAdminUserService.setUserAsRegular(
      req.bill!,
      createID(userID)
    );
    res.send(result);
  }

  static async removeUserFromBill(req: Request, res: Response) {
    const result = await BillIDAdminUserService.removeUserFromBill(
      createID(req.params.billID),
      createID(req.params.userID)
    );
    res.send(result);
  }
}
