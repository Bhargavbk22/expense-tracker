import Budget from "../models/Budget.js";
import Expense from "../models/Expense.js";
import Income from "../models/Income.js";
import { getMonthRange } from "../utils/dateUtils.js";

export const getSummary = async (userId, month, year) => {
  const range = getMonthRange(month, year);
  const dateFilter = { $gte: range.start, $lt: range.end };

  const [expenseAgg, incomeAgg, budget, recentTransactions, categorySummary] = await Promise.all([
    Expense.aggregate([
      { $match: { userId, date: dateFilter } },
      { $group: { _id: null, total: { $sum: "$amount" }, count: { $sum: 1 } } }
    ]),
    Income.aggregate([
      { $match: { userId, date: dateFilter } },
      { $group: { _id: null, total: { $sum: "$amount" }, count: { $sum: 1 } } }
    ]),
    Budget.findOne({ userId, month: range.month, year: range.year }),
    Promise.all([
      Expense.find({ userId }).sort({ date: -1 }).limit(5).lean(),
      Income.find({ userId }).sort({ date: -1 }).limit(5).lean()
    ]),
    Expense.aggregate([
      { $match: { userId, date: dateFilter } },
      { $group: { _id: "$category", total: { $sum: "$amount" } } },
      { $sort: { total: -1 } }
    ])
  ]);

  const totalExpenses = expenseAgg[0]?.total || 0;
  const totalIncome = incomeAgg[0]?.total || 0;
  const [expenses, income] = recentTransactions;
  const transactions = [
    ...expenses.map((item) => ({ ...item, type: "expense", label: item.title })),
    ...income.map((item) => ({ ...item, type: "income", label: item.source }))
  ]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 8);

  return {
    month: range.month,
    year: range.year,
    totalIncome,
    totalExpenses,
    balance: totalIncome - totalExpenses,
    expenseCount: expenseAgg[0]?.count || 0,
    incomeCount: incomeAgg[0]?.count || 0,
    budget: budget?.monthlyLimit || 0,
    budgetExceeded: budget ? totalExpenses > budget.monthlyLimit : false,
    budgetUsage: budget?.monthlyLimit ? Math.round((totalExpenses / budget.monthlyLimit) * 100) : 0,
    recentTransactions: transactions,
    categorySummary
  };
};

export const getMonthlyAnalytics = async (userId, year = new Date().getFullYear()) => {
  const start = new Date(Number(year), 0, 1);
  const end = new Date(Number(year) + 1, 0, 1);

  const [expenses, incomes] = await Promise.all([
    Expense.aggregate([
      { $match: { userId, date: { $gte: start, $lt: end } } },
      { $group: { _id: { $month: "$date" }, total: { $sum: "$amount" } } }
    ]),
    Income.aggregate([
      { $match: { userId, date: { $gte: start, $lt: end } } },
      { $group: { _id: { $month: "$date" }, total: { $sum: "$amount" } } }
    ])
  ]);

  return Array.from({ length: 12 }, (_, index) => {
    const month = index + 1;
    return {
      month,
      expenses: expenses.find((item) => item._id === month)?.total || 0,
      income: incomes.find((item) => item._id === month)?.total || 0
    };
  });
};

export const getCategoryAnalytics = async (userId, month, year) => {
  const range = getMonthRange(month, year);
  return Expense.aggregate([
    { $match: { userId, date: { $gte: range.start, $lt: range.end } } },
    { $group: { _id: "$category", total: { $sum: "$amount" }, count: { $sum: 1 } } },
    { $sort: { total: -1 } }
  ]);
};
