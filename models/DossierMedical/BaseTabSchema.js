// BaseTabSchema.js
import mongoose from "mongoose";

const { Schema } = mongoose;

const CommentSchema = new Schema({
  message: { type: String, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: null },
});

const BaseTabSchema = new Schema(
  {
    status: {
      type: String,
      enum: ["En cours", "Accepté", "refusé", "A refaire"],
      default: "En cours",
    },
    reviewedBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
    lastReviewedAt: { type: Date, default: null },
    comments: [CommentSchema], 
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { _id: false }
);

export default BaseTabSchema;
