import express from "express";
import { BillIDAdminController } from "src/controllers";

import billIDAdminUserRoute from "./user/bill-id-admin-user.route";

const router = express.Router({ mergeParams: true });
router.get("/", BillIDAdminController.getBillAsAdmin);
router.post("/refresh-code", BillIDAdminController.refreshInvitationCode);
router.post("/require", BillIDAdminController.setRequireAccept);
router.put("/accept", BillIDAdminController.acceptRequest);
router.put("/reject", BillIDAdminController.rejectRequest);
router.post("/virtual", BillIDAdminController.addVirtualUser);
router.put(
  "/virtual/:virtualUserID",
  BillIDAdminController.mergeVirtualUserToUser
);
router.put("/name", BillIDAdminController.changeBillName);
router.use("/user", billIDAdminUserRoute);
export default router;
