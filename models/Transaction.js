import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  createdDate: {
    type: Number,
  },
  description: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Transaction ||
  mongoose.model("Transaction", transactionSchema);
