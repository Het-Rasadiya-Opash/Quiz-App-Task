import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  timeLimitSec: {
    type: Number,
    default: 10,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const quizModel = mongoose.model("Quiz", quizSchema);

export default quizModel;
