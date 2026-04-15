import express from "express";
const router = express.Router();
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { submitAttempt } from "../controllers/attempt.controller.js";

router.post("/:attemptId/submit", authMiddleware, submitAttempt);

export default router;
