import asyncHandler from "../utils/asyncHandler.js";
import { createMonthlyReport } from "../services/reportService.js";

export const monthlyReport = asyncHandler(async (req, res) => {
  await createMonthlyReport({
    user: req.user,
    month: req.query.month,
    year: req.query.year,
    res
  });
});
