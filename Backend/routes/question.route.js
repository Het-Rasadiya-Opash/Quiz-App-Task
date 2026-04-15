import express from "express";
const router = express.Router();
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { authorizeRole } from "../middlewares/roleBaseAuthMiddleware.js";
import {
  createQuestion,
  deleteQuestion,
  editQuestion,
  getQuestion,
} from "../controllers/question.controller.js";

router.get("/", getQuestion);

router.post(
  "/create/:quizId",
  authMiddleware,
  authorizeRole("admin"),
  createQuestion,
);

router.put(
  "/edit/:questionId",
  authMiddleware,
  authorizeRole("admin"),
  editQuestion,
);

router.delete(
  "/delete/:questionId",
  authMiddleware,
  authorizeRole("admin"),
  deleteQuestion,
);

export default router;
