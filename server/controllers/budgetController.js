import Budget from "../models/Budget.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getBudget = asyncHandler(async (req, res) => {
  const now = new Date();
  const budget = await Budget.findOne({
    userId: req.user._id,
    month: Number(req.query.month || now.getMonth() + 1),
    year: Number(req.query.year || now.getFullYear())
  });
  res.json(budget || null);
});

export const upsertBudget = asyncHandler(async (req, res) => {
  const { monthlyLimit, month, year } = req.body;
  const budget = await Budget.findOneAndUpdate(
    { userId: req.user._id, month, year },
    { monthlyLimit, month, year, userId: req.user._id },
    { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
  );
  res.status(201).json(budget);
});
