import mongoose from 'mongoose';
const { Schema } = mongoose;

const ReviewSchema = new Schema({
  status: {
    type: String,
    enum: ["approved", "rejected", "pending"],
    default: "pending"
  },
  reviewedBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
  reviewedAt: { type: Date, default: null },
  comment: { type: String, default: null }
}, { _id: false });

export default ReviewSchema;
