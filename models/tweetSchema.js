import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    description: { type: String, required: true, max: 280 },
    likes: { type: Array, defaultValue: [] },
    photo: {
      type: String,
    },
    video: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Tweet", tweetSchema);
