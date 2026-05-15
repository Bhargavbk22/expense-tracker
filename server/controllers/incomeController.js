import Income from "../models/Income.js";
import mongoose from "mongoose";
import asyncHandler from "../utils/asyncHandler.js";

export const getIncome = asyncHandler(async (req, res) => {
  const filter = { userId: req.user._id };
  if (req.query.month || req.query.year) {
    const year = Number(req.query.year || new Date().getFullYear());
    const month = Number(req.query.month || new Date().getMonth() + 1);
    filter.date = { $gte: new Date(year, month - 1, 1), $lt: new Date(year, month, 1) };
  }
  const income = await Income.find(filter).sort({ date: -1 });
  res.json(income);
});

export const createIncome = asyncHandler(async (req, res) => {
  const income = await Income.create({ ...req.body, userId: req.user._id });
  res.status(201).json(income);
});

export const updateIncome = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    const error = new Error("Invalid income id");
    error.statusCode = 400;
    throw error;
  }

  const income = await Income.findOneAndUpdate({ _id: req.params.id, userId: req.user._id }, req.body, {
    new: true,
    runValidators: true
  });

  if (!income) {
    const error = new Error("Income not found");
    error.statusCode = 404;
    throw error;
  }

  res.json(income);
});

export const deleteIncome = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    const error = new Error("Invalid income id");
    error.statusCode = 400;
    throw error;
  }

  const income = await Income.findOneAndDelete({ _id: req.params.id, userId: req.user._id });

  if (!income) {
    const error = new Error("Income not found");
    error.statusCode = 404;
    throw error;
  }

  res.json({ message: "Income deleted" });
});
