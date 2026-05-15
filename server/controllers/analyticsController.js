import asyncHandler from "../utils/asyncHandler.js";
import { getCategoryAnalytics, getMonthlyAnalytics, getSummary } from "../services/analyticsService.js";
import { generateSuggestions } from "../services/suggestionService.js";

export const monthlyAnalytics = asyncHandler(async (req, res) => {
  const data = await getMonthlyAnalytics(req.user._id, req.query.year);
  res.json(data);
});

export const categoryAnalytics = asyncHandler(async (req, res) => {
  const data = await getCategoryAnalytics(req.user._id, req.query.month, req.query.year);
  res.json(data);
});

export const summaryAnalytics = asyncHandler(async (req, res) => {
  const [summary, suggestions] = await Promise.all([
    getSummary(req.user._id, req.query.month, req.query.year),
    generateSuggestions(req.user._id, req.query.month, req.query.year)
  ]);
  res.json({ ...summary, suggestions });
});
