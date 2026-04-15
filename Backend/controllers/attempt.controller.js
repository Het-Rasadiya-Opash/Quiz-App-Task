import attemptModel from "../models/attempt.model.js";
import questionModel from "../models/question.model.js";
import quizModel from "../models/quiz.model.js";

export const startAttempt = async (req, res) => {
  try {
    const { quizId } = req.params;
    const userId = req.user.userId;

    const quiz = await quizModel.findById(quizId);
    if (!quiz) {
      return res
        .status(404)
        .json({ success: false, message: "Quiz not found" });
    }

    const attempt = await attemptModel.create({
      userId,
      quizId,
      startedAt: new Date(),
    });

    const questions = await questionModel
      .find({ quizId })
      .select("-correctIndex");

    return res.status(201).json({
      success: true,
      message: "Attempt started",
      data: {
        attemptId: attempt._id,
        quiz,
        questions,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error starting attempt" });
  }
};

export const submitAttempt = async (req, res) => {
  try {
    const { attemptId } = req.params;
    const { answers } = req.body;

    const attempt = await attemptModel.findById(attemptId);
    if (!attempt) {
      return res
        .status(404)
        .json({ success: false, message: "Attempt not found" });
    }

    if (attempt.submittedAt) {
      return res
        .status(400)
        .json({ success: false, message: "Attempt already submitted" });
    }

    const questionIds = answers.map((a) => a.questionId);
    const questions = await questionModel
      .find({ _id: { $in: questionIds } })
      .select("+correctIndex");

    let score = 0;
    const scoredAnswers = answers.map((answer) => {
      const question = questions.find(
        (q) => q._id.toString() === answer.questionId,
      );
      if (question && question.correctIndex === answer.selectedIndex) score++;
      return {
        questionId: answer.questionId,
        selectedIndex: answer.selectedIndex,
      };
    });

    attempt.answers = scoredAnswers;
    attempt.score = score;
    attempt.submittedAt = new Date();
    await attempt.save();

    return res.status(200).json({
      success: true,
      message: "Attempt submitted",
      data: { score, total: answers.length, attemptId },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error submitting attempt" });
  }
};

export const getLeaderboard = async (req, res) => {
  try {
    const { quizId } = req.params;

    const attempts = await attemptModel
      .find({ quizId, submittedAt: { $exists: true } })
      .populate("userId", "email")
      .lean();

    const leaderboard = attempts
      .map((a) => ({
        email: a.userId?.email,
        score: a.score,
        timeTaken: a.submittedAt - a.startedAt,
      }))
      .sort((a, b) => b.score - a.score || a.timeTaken - b.timeTaken)
      .slice(0, 10);

    return res.status(200).json({ success: true, data: leaderboard });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error fetching leaderboard" });
  }
};
