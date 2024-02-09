import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  option: {
    type: String,
    required: true,
    enum: ["a", "b", "c", "d"],
  },
  content: {
    type: String,
    required: true,
  },
});

const questionSchema = new mongoose.Schema(
  {
    statement: {
      type: String,
      required: true,
    },
    answers: {
      type: [answerSchema],
      required: true,
    },
    correctAnswer: {
      type: String,
      required: true,
      enum: ["a", "b", "c", "d"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Question", questionSchema);
