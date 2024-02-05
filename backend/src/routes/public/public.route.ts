import express from "express";
import { PublicController } from "src/controllers";

const router = express.Router({ mergeParams: true });
router.get("/currency", PublicController.getCurrency);
export default router;
