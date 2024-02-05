import express from "express";
import PaymentController from "src/controllers/payment/payment.controller";

const router = express.Router({ mergeParams: true });

router.post("/", PaymentController.saveNewPayment);

export default router;
