import mongoose from "mongoose";
import Expense from "../models/Expense.js";
import asyncHandler from "../utils/asyncHandler.js";

const buildExpenseFilter = (query, userId) => {
  const filter = { userId };
  if (query.category) filter.category = query.category;
  if (query.month || query.year) {
    const year = Number(query.year || new Date().getFullYear());
    const month = Number(query.month || new Date().getMonth() + 1);
    filter.date = { $gte: new Date(year, month - 1, 1), $lt: new Date(year, month, 1) };
  }
  if (query.startDate || query.endDate) {
    filter.date = {
      ...(filter.date || {}),
      ...(query.startDate ? { $gte: new Date(query.startDate) } : {}),
      ...(query.endDate ? { $lte: new Date(query.endDate) } : {})
    };
  }
  if (query.minAmount || query.maxAmount) {
    filter.amount = {
      ...(query.minAmount ? { $gte: Number(query.minAmount) } : {}),
      ...(query.maxAmount ? { $lte: Number(query.maxAmount) } : {})
    };
  }
  return filter;
};

export const getExpenses = asyncHandler(async (req, res) => {
  const expenses = await Expense.find(buildExpenseFilter(req.query, req.user._id)).sort({ date: -1 });
  res.json(expenses);
});

export const createExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.create({ ...req.body, userId: req.user._id });
  res.status(201).json(expense);
});

export const updateExpense = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    const error = new Error("Invalid expense id");
    error.statusCode = 400;
    throw error;
  }

  const expense = await Expense.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    req.body,
    { new: true, runValidators: true }
  );

  if (!expense) {
    const error = new Error("Expense not found");
    error.statusCode = 404;
    throw error;
  }

  res.json(expense);
});

export const deleteExpense = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    const error = new Error("Invalid expense id");
    error.statusCode = 400;
    throw error;
  }

  const expense = await Expense.findOneAndDelete({ _id: req.params.id, userId: req.user._id });

  if (!expense) {
    const error = new Error("Expense not found");
    error.statusCode = 404;
    throw error;
  }

  res.json({ message: "Expense deleted" });
});
