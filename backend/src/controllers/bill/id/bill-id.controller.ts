import { Request, Response } from "express";
import { BillIDService } from "src/services";
import { createID } from "src/types";

export class BillIDController {
  static async getBill(req: Request, res: Response) {
    const result = await BillIDService.getBill(createID(req.params.billID));
    res.send(result);
  }

  static async getPayment(req: Request, res: Response) {
    const result = await BillIDService.getPayment(createID(req.params.billID));
    res.send(result);
  }

  static async leaveBill(req: Request, res: Response) {
    const result = await BillIDService.leaveBill(
      createID(req.params.billID),
      req.user!
    );
    res.send(result);
  }
}
