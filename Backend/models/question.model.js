import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
    },
    text: {
      type: String,
      required: true,
    },
    options: {
      type: [String],
      validate: [
        (option) => option.length === 4,
        "Question must have exactly 4 options",
      ],
      required: true,
    },

    correctIndex: {
      type: Number,
      required: true,
      select: false,
    },
  },
  {
    timestamps: true,
  },
);

const questionModel = mongoose.model("Question", questionSchema);

export default questionModel;
