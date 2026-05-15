import mongoose from "mongoose";

export const expenseCategories = [
  "Food",
  "Transport",
  "Housing",
  "Utilities",
  "Entertainment",
  "Healthcare",
  "Shopping",
  "Education",
  "Travel",
  "Other"
];

const expenseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    amount: { type: Number, required: true, min: 0 },
    category: { type: String, enum: expenseCategories, default: "Other" },
    date: { type: Date, required: true, default: Date.now },
    notes: { type: String, trim: true, maxlength: 500 },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true }
  },
  { timestamps: true }
);

export default mongoose.model("Expense", expenseSchema);
