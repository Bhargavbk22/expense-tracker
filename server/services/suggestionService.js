import Expense from "../models/Expense.js";
import Income from "../models/Income.js";
import { getMonthRange, getPreviousMonth } from "../utils/dateUtils.js";

export const generateSuggestions = async (userId, month, year) => {
  const current = getMonthRange(month, year);
  const previousMonth = getPreviousMonth(current.month, current.year);
  const previous = getMonthRange(previousMonth.month, previousMonth.year);

  const [categories, currentExpense, previousExpense, currentIncome, previousIncome] = await Promise.all([
    Expense.aggregate([
      { $match: { userId, date: { $gte: current.start, $lt: current.end } } },
      { $group: { _id: "$category", total: { $sum: "$amount" } } },
      { $sort: { total: -1 } }
    ]),
    Expense.aggregate([
      { $match: { userId, date: { $gte: current.start, $lt: current.end } } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]),
    Expense.aggregate([
      { $match: { userId, date: { $gte: previous.start, $lt: previous.end } } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]),
    Income.aggregate([
      { $match: { userId, date: { $gte: current.start, $lt: current.end } } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]),
    Income.aggregate([
      { $match: { userId, date: { $gte: previous.start, $lt: previous.end } } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ])
  ]);

  const totalExpense = currentExpense[0]?.total || 0;
  const prevExpense = previousExpense[0]?.total || 0;
  const totalIncome = currentIncome[0]?.total || 0;
  const prevIncome = previousIncome[0]?.total || 0;
  const savings = totalIncome - totalExpense;
  const prevSavings = prevIncome - prevExpense;
  const suggestions = [];

  const topCategory = categories[0];
  if (topCategory && totalExpense && topCategory.total / totalExpense >= 0.3) {
    suggestions.push(`${topCategory._id} expenses are high this month.`);
  }

  if (prevExpense && totalExpense > prevExpense * 1.15) {
    suggestions.push(`Your spending increased by ${Math.round(((totalExpense - prevExpense) / prevExpense) * 100)}% compared with last month.`);
  }

  if (prevSavings > 0 && savings > prevSavings) {
    suggestions.push(`You saved ${Math.round(((savings - prevSavings) / prevSavings) * 100)}% more than last month.`);
  }

  if (totalIncome > 0 && totalExpense / totalIncome < 0.7) {
    suggestions.push("You are keeping expenses below 70% of income. Nice discipline.");
  }

  if (!suggestions.length) {
    suggestions.push("Add more transactions to unlock smarter spending suggestions.");
  }

  return suggestions;
};
