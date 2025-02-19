import { Request, Response } from "express";
import {
  UserExceptionFactory,
  ValidationExceptionFactory,
} from "src/exceptions";
import { BillIDAdminService } from "src/services";
import { createBillName, createID, createUsername } from "src/types";

export class BillIDAdminController {
  static async getBillAsAdmin(req: Request, res: Response) {
    const billID = createID(req.params.billID);
    const result = await BillIDAdminService.getBillAsAdmin(billID);
    res.send(result);
  }

  static async refreshInvitationCode(req: Request, res: Response) {
    const result = await BillIDAdminService.refreshInvitationCode(req.bill!);
    res.send(result);
  }

  static async setRequireAccept(req: Request, res: Response) {
    if (typeof req.body.require !== "boolean") {
      throw ValidationExceptionFactory.createInvalidValueException(
        "value must be boolean"
      );
    }

    const result = await BillIDAdminService.setRequireAccept(
      req.bill!,
      req.body.require
    );

    res.send(result);
  }

  static async acceptRequest(req: Request, res: Response) {
    const userID = createID(req.body.userID);
    const result = await BillIDAdminService.acceptRequest(req.bill!, userID);

    res.send(result);
  }

  static async rejectRequest(req: Request, res: Response) {
    const userID = createID(req.body.userID);
    const result = await BillIDAdminService.rejectRequest(req.bill!, userID);

    res.send(result);
  }

  static async addVirtualUser(req: Request, res: Response) {
    const result = await BillIDAdminService.addVirtualUser(
      createID(req.params.billID),
      createUsername(req.body.username)
    );
    res.send(result);
  }

  static async mergeVirtualUserToUser(req: Request, res: Response) {
    const userID = createID(req.body.userID, "user ID");
    const virtualUserID = createID(req.params.virtualUserID, "virtual user ID");
    const user = req.bill?.users.find((item) => item.toString() === userID);
    if (!user) {
      throw UserExceptionFactory.createUserNotFoundException(userID);
    }

    const virtualUser = req.bill?.virtualUsers.find(
      (item) => item.id.toString() === virtualUserID
    );

    if (!virtualUser) {
      throw UserExceptionFactory.createUserNotFoundException(virtualUserID);
    }

    const result = await BillIDAdminService.mergeVirtualUserToUser(
      req.bill!,
      virtualUserID,
      userID
    );

    res.send(result);
  }

  static async changeBillName(req: Request, res: Response) {
    const result = await BillIDAdminService.changeBillName(
      req.bill!,
      createBillName(req.body.billName)
    );
    res.send(result);
  }
}
