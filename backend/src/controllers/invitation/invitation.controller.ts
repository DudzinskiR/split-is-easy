import { Request, Response } from "express";
import { InvitationExceptionFactory } from "src/exceptions";
import { InvitationService } from "src/services";

export class InvitationController {
  static async getInvitation(req: Request, res: Response) {
    const result = await InvitationService.getInvitation(
      req.params.invCode,
      req.user!
    );

    res.send(result);
  }

  static async sendRequest(req: Request, res: Response) {
    if (!req.params.invCode) {
      throw InvitationExceptionFactory.createCodeNotProvidedException();
    }
    const result = await InvitationService.sendRequest(
      req.params.invCode,
      req.user!
    );

    res.send(result);
  }

  static async cancelRequest(req: Request, res: Response) {
    const result = await InvitationService.cancelRequest(req.bill!, req.user!);

    res.send(result);
  }

  static async acceptInvitation(req: Request, res: Response) {
    if (!req.params.invCode) {
      throw InvitationExceptionFactory.createCodeNotProvidedException();
    }

    const result = await InvitationService.acceptInvitation(
      req.params.invCode,
      req.user!
    );

    res.send(result);
  }
}
