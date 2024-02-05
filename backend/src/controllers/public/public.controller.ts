import { Request, Response } from "express";
import { currencyList } from "src/utils/const/currency-list";

export class PublicController {
  static async getCurrency(req: Request, res: Response) {
    res.status(200).json(currencyList);
  }
}
