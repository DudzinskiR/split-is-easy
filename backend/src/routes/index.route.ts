import express from "express";
import accountRoute from "./account/account.route";
import billRoute from "./bill/bill.route";
import publicRoute from "./public/public.route";
import userRoute from "./user/user.route";
import invitationRoute from "./invitation/invitation.route";
import requestRoute from "./request/request.route";
import paymentRoute from "./payment/payment.route";
import { decodeToken, getUser } from "src/middlewares";

const router = express.Router({ mergeParams: true });

router.use("/account", decodeToken, getUser, accountRoute);
router.use("/bill", decodeToken, getUser, billRoute);
router.use("/inv", decodeToken, getUser, invitationRoute);
router.use("/request", decodeToken, getUser, requestRoute);
router.use("/user", decodeToken, userRoute);
router.use("/payment", decodeToken, getUser, paymentRoute);
router.use("/p", publicRoute);

export default router;
