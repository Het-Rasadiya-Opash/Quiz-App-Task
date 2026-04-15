import quizModel from "../models/quiz.model.js";

export const createQuiz = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { title, timeLimitSec } = req.body;
    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title Required",
        status: "failed",
      });
    }
    let quiz = await quizModel.create({
      title,
      timeLimitSec,
      createdBy: userId,
    });
    return res.status(201).json({
      success: true,
      message: "Quiz Created Successfully",
      status: "success",
      data: quiz,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error - Create Quiz",
      status: "failed",
    });
  }
};

export const editQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { title, timeLimitSec } = req.body;

    const findQuiz = await quizModel.findById(quizId);
    if (!findQuiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found",
      });
    }

    const updatedQuiz = await quizModel.findByIdAndUpdate(
      quizId,
      { title, timeLimitSec },
      { new: true },
    );

    return res.status(200).json({
      success: true,
      message: "Quiz updated successfully",
      data: updatedQuiz,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error - Edit Quiz",
    });
  }
};

export const deleteQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;

    const deletedQuiz = await quizModel.findByIdAndDelete(quizId);

    if (!deletedQuiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Quiz deleted successfully",
      data: deletedQuiz,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error - Delete Quiz",
    });
  }
};

export const getQuiz = async (req, res) => {
  try {
    const getQuiz = await quizModel.find().populate("createdBy", "email role");
    return res.status(200).json({
      success: true,
      message: "Quiz fetch successfully",
      data: getQuiz,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error - Fetch Quiz",
    });
  }
};
