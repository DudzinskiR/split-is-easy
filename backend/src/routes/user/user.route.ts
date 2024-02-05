import express from "express";
import { UserController } from "src/controllers";

const router = express.Router({ mergeParams: true });

router.get("/:userID", UserController.getUsername);

export default router;
