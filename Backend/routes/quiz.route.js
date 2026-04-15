import express from "express";
const router = express.Router();
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { authorizeRole } from "../middlewares/roleBaseAuthMiddleware.js";
import {
  createQuiz,
  deleteQuiz,
  editQuiz,
  getQuiz,
  getQuizById,
} from "../controllers/quiz.controller.js";

router.get("/", getQuiz);
router.get("/:quizId", getQuizById);

router.post("/create", authMiddleware, authorizeRole("admin"), createQuiz);
router.post("/edit/:quizId", authMiddleware, authorizeRole("admin"), editQuiz);
router.delete(
  "/delete/:quizId",
  authMiddleware,
  authorizeRole("admin"),
  deleteQuiz,
);

export default router;
