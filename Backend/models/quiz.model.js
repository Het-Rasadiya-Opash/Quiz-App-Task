import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  timeLimitSec: {
    type: Number,
    default: 30,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Quiz = mongoose.model("Quiz", quizSchema);

export default Quiz;
