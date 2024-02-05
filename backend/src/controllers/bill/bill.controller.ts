import { Request, Response } from "express";
import { BillService } from "src/services";
import { createBillName, createCurrencyCode } from "src/types";

export class BillController {
  static async createNewBill(req: Request, res: Response) {
    const result = await BillService.createNewBill(
      createBillName(req.body.name),
      createCurrencyCode(req.body.currencyCode),
      req.user!
    );

    res.send(result);
  }

  static async getBillsList(req: Request, res: Response) {
    const result = await BillService.getBillsList(req.user!);
    res.send(result);
  }
}
