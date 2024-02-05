import express from "express";
import billIDAdminRoute from "./admin/bill-id-admin.route";
import { BillIDController } from "src/controllers";
import { checkBillAdmin } from "src/middlewares";

const router = express.Router({ mergeParams: true });

router.get("/", BillIDController.getBill);
router.get("/payment", BillIDController.getPayment);
router.delete("/leave", BillIDController.leaveBill);

router.use("/admin", checkBillAdmin, billIDAdminRoute);

export default router;
