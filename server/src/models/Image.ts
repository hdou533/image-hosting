import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    originalName: {
      type: String,
      required: true,
    },
    filename: {
      type: String,
    },
    url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Image = mongoose.model("Image", imageSchema);

export default Image;
