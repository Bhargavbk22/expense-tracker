import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema(
  {
    source: { type: String, required: true, trim: true, maxlength: 120 },
    amount: { type: Number, required: true, min: 0 },
    date: { type: Date, required: true, default: Date.now },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true }
  },
  { timestamps: true }
);

export default mongoose.model("Income", incomeSchema);
