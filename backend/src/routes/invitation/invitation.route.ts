import express from "express";
import { InvitationController } from "src/controllers";
import { getBill, getUser } from "src/middlewares";

const router = express.Router({ mergeParams: true });

router.post("/:invCode", InvitationController.sendRequest);
router.get("/:invCode", InvitationController.getInvitation);
router.post("/:invCode/accept", InvitationController.acceptInvitation);
router.delete("/:billID", getUser, getBill, InvitationController.cancelRequest);

export default router;
