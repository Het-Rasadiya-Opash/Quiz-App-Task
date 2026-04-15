import questionModel from "../models/question.model.js";

export const createQuestion = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { text, options, correctIndex } = req.body;

    if (!text || !options || !correctIndex) {
      return res.status(400).json({
        success: false,
        message: "text, options, and correctIndex are required",
      });
    }

    if (options.length !== 4) {
      return res.status(400).json({
        success: false,
        message: "Exactly 4 options are required",
      });
    }

    const createdQuestion = await questionModel.create({
      quizId,
      text,
      options,
      correctIndex,
    });

    return res.status(201).json({
      success: true,
      message: "Question created successfully",
      data: createdQuestion,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error - Create Questions",
     
    });
  }
};

export const editQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;
    const { text, options, correctIndex } = req.body;
    const updatedQuestion = await questionModel.findByIdAndUpdate(
      questionId,
      {
        text,
        options,
        correctIndex,
      },
      {
        new: true,
      },
    );
    if (!updatedQuestion) {
      return res.status(500).json({
        success: false,
        message: "Question not found for this id",
       
      });
    }
    res.status(500).json({
      success: true,
      message: "Question updated successfully",
      data: updatedQuestion,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error - Updating Question",
      
    });
  }
};

export const getQuestion = async (req, res) => {
  try {
    const questions = await questionModel.find();
    res.status(500).json({
      success: true,
      message: "Question Fetch successfully",
      data: questions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error - Fetch Question",
    
    });
  }
};

export const deleteQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;

    const deletedQuestion = await questionModel.findByIdAndDelete(questionId);
    if (!deletedQuestion) {
      return res.status(500).json({
        success: false,
        message: "Question not found for this id",
      });
    }
    res.status(500).json({
      success: true,
      message: "Question Deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error - Deleted Question",
      
    });
  }
};
