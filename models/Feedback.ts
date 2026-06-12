import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    rating: Number,
    feedback: String,
    showonwebsite: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Feedback ||
  mongoose.model("Feedback", FeedbackSchema);
