import express from "express";
import { AccountController } from "src/controllers";

const router = express.Router({ mergeParams: true });
router.get("/", AccountController.getUsername);
export default router;
