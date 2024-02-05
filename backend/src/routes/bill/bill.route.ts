import express from "express";
import { BillController } from "src/controllers";
import { checkUserInBill, getBill } from "src/middlewares";
import billIDRoute from "./id/bill-id.route";

const router = express.Router({ mergeParams: true });

router.post("/", BillController.createNewBill);
router.get("/", BillController.getBillsList);
router.use("/:billID", getBill, checkUserInBill, billIDRoute);

export default router;
