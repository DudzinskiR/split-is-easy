import { Request, Response } from "express";

export class AccountController {
  static async getUsername(req: Request, res: Response) {
    res.status(200).json({
      userID: req.user?.id,
      username: req.user?.username,
      bills: req.user?.bills,
    });
  }
}
