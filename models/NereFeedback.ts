import mongoose from "mongoose";

const NereFeedbackSchema = new mongoose.Schema(
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

export default mongoose.models.NereFeedback ||
  mongoose.model("NereFeedback", NereFeedbackSchema);
