import { Request, Response } from "express";
import { RequestService } from "src/services";
import { createID } from "src/types";

export class RequestController {
  static async getRequestsList(req: Request, res: Response) {
    const userID = createID(req.user?.id);
    const result = await RequestService.getRequestsList(userID);
    res.send(result);
  }

  static async cancelRequest(req: Request, res: Response) {
    const result = await RequestService.cancelRequest(req.bill!, req.user!);
    res.send(result);
  }
}
