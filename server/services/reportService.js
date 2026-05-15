import PDFDocument from "pdfkit";
import Expense from "../models/Expense.js";
import Income from "../models/Income.js";
import { getMonthlyAnalytics, getSummary } from "./analyticsService.js";
import { generateSuggestions } from "./suggestionService.js";
import { getMonthRange } from "../utils/dateUtils.js";

const drawHorizontalChart = (doc, title, rows, color = "#0f766e") => {
  doc.moveDown().fontSize(14).fillColor("#111827").text(title, { underline: true });

  if (!rows.length) {
    doc.fontSize(10).text("No chart data available.");
    return;
  }

  const startX = doc.x;
  const maxWidth = 260;
  const maxValue = Math.max(...rows.map((row) => row.value), 1);

  rows.slice(0, 8).forEach((row) => {
    const y = doc.y + 8;
    const width = Math.max((row.value / maxValue) * maxWidth, 4);
    doc.fontSize(9).fillColor("#374151").text(row.label, startX, y, { width: 110 });
    doc.rect(startX + 120, y, width, 10).fill(color);
    doc.fillColor("#374151").text(`$${row.value.toFixed(2)}`, startX + 390, y - 1);
    doc.y = y + 16;
  });
};

export const createMonthlyReport = async ({ user, month, year, res }) => {
  const range = getMonthRange(month, year);
  const [summary, monthly, suggestions, expenses, incomes] = await Promise.all([
    getSummary(user._id, range.month, range.year),
    getMonthlyAnalytics(user._id, range.year),
    generateSuggestions(user._id, range.month, range.year),
    Expense.find({ userId: user._id, date: { $gte: range.start, $lt: range.end } }).sort({ date: -1 }).lean(),
    Income.find({ userId: user._id, date: { $gte: range.start, $lt: range.end } }).sort({ date: -1 }).lean()
  ]);

  const doc = new PDFDocument({ margin: 48, size: "A4" });
  const filename = `expense-report-${range.year}-${String(range.month).padStart(2, "0")}.pdf`;

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
  doc.pipe(res);

  doc.fontSize(22).text("Smart Expense Tracker Report", { align: "center" });
  doc.moveDown(0.4).fontSize(11).text(`${user.name} - ${range.month}/${range.year}`, { align: "center" });
  doc.moveDown();

  doc.fontSize(14).text("Totals", { underline: true });
  doc.fontSize(11)
    .text(`Total Income: $${summary.totalIncome.toFixed(2)}`)
    .text(`Total Expenses: $${summary.totalExpenses.toFixed(2)}`)
    .text(`Remaining Balance: $${summary.balance.toFixed(2)}`)
    .text(`Budget: $${summary.budget.toFixed(2)} (${summary.budgetUsage}% used)`);

  doc.moveDown().fontSize(14).text("Category Summary", { underline: true });
  if (summary.categorySummary.length) {
    summary.categorySummary.forEach((item) => {
      doc.fontSize(10).text(`${item._id}: $${item.total.toFixed(2)}`);
    });
  } else {
    doc.fontSize(10).text("No expense categories for this month.");
  }

  drawHorizontalChart(
    doc,
    "Category Chart",
    summary.categorySummary.map((item) => ({ label: item._id, value: item.total })),
    "#e85d4f"
  );

  drawHorizontalChart(
    doc,
    "Monthly Expense Chart",
    monthly.map((item) => ({ label: `Month ${item.month}`, value: item.expenses })).filter((item) => item.value > 0),
    "#0f766e"
  );

  doc.moveDown().fontSize(14).text("AI Spending Suggestions", { underline: true });
  suggestions.forEach((suggestion) => doc.fontSize(10).text(`- ${suggestion}`));

  doc.moveDown().fontSize(14).text("Transactions", { underline: true });
  const rows = [
    ...incomes.map((item) => ({ date: item.date, label: item.source, type: "Income", amount: item.amount })),
    ...expenses.map((item) => ({ date: item.date, label: item.title, type: `Expense - ${item.category}`, amount: -item.amount }))
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  if (!rows.length) {
    doc.fontSize(10).text("No transactions found for this month.");
  } else {
    rows.forEach((row) => {
      doc.fontSize(9).text(
        `${new Date(row.date).toLocaleDateString()} | ${row.type} | ${row.label} | $${Math.abs(row.amount).toFixed(2)}`
      );
    });
  }

  doc.end();
};
