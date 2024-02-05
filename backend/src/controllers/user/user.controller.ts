import { Request, Response } from "express";
import { UserService } from "src/services";
import { createID } from "src/types";

export class UserController {
  static async getUsername(req: Request, res: Response) {
    const userID = req.params.userID;
    const result = await UserService.getUsername(createID(userID));

    res.send(result);
  }
}
