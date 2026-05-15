import { expenseCategories } from "../models/Expense.js";

export const expenseValidation = {
  title: { required: true },
  amount: { required: true, type: "number", min: 0 },
  category: { required: true, enum: expenseCategories },
  date: { required: true }
};
