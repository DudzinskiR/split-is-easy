import express from "express";
import { RequestController } from "src/controllers";

const router = express.Router({ mergeParams: true });

router.get("/", RequestController.getRequestsList);
router.delete("/:billID", RequestController.cancelRequest);

export default router;
