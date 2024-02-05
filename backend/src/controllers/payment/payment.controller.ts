import { Request, Response } from "express";
import { SplitType } from "src/enums";
import { ValidationExceptionFactory } from "src/exceptions";
import { PaymentService } from "src/services";
import { findValue } from "src/utils/helpers";
import {
  createCurrencyCode,
  createID,
  createPaymentAmount,
  createPaymentTitle,
  Participant,
} from "src/types";

export default class PaymentController {
  static async saveNewPayment(req: Request, res: Response) {
    const title = createPaymentTitle(req.body.title);
    const amount = createPaymentAmount(req.body.amount);
    const paidBy = createID(req.body.paidBy, "paid by user ID");
    const participants = PaymentController.createParticipants(
      req.body.participants
    );
    const currency = createCurrencyCode(req.body.currency);
    const billID = createID(req.body.billID, "bill ID");
    const splitType = findValue(
      SplitType,
      req.body.splitType,
      SplitType.UNKNOWN
    );
    const user = req.user!;

    if (splitType === "UNKNOWN") {
      throw ValidationExceptionFactory.createInvalidValueException(
        `${splitType} is not correct split type`
      );
    }

    const result = await PaymentService.saveNewPayment({
      currency,
      paidBy,
      billID,
      title,
      amount,
      splitType,
      participants,
      user,
    });
    res.send(result);
  }

  private static createParticipants(participants: any[]) {
    if (!Array.isArray(participants)) {
      throw ValidationExceptionFactory.createInvalidValueException(
        `participants is not array`
      );
    }

    if (participants.length === 0) {
      throw ValidationExceptionFactory.createInvalidValueException(
        `participants is empty`
      );
    }

    const result: Participant[] = [];
    for (const item of participants) {
      result.push({
        userID: createID(item.userID, "User ID"),
        auto: item.auto,
        value: createPaymentAmount(item.value),
      });
    }

    return result;
  }
}
