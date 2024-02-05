import express from "express";
import { BillIDAdminUserController } from "src/controllers";

const router = express.Router({ mergeParams: true });
router.put("/:userID/admin", BillIDAdminUserController.setUserAsAdmin);
router.put("/:userID/regular", BillIDAdminUserController.setUserAsRegular);
router.delete("/:userID", BillIDAdminUserController.removeUserFromBill);

export default router;
