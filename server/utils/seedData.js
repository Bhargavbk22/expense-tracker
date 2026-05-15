import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Budget from "../models/Budget.js";
import Expense from "../models/Expense.js";
import Income from "../models/Income.js";
import User from "../models/User.js";

dotenv.config();

const seed = async () => {
  await connectDB();

  await Promise.all([User.deleteMany({}), Expense.deleteMany({}), Income.deleteMany({}), Budget.deleteMany({})]);

  const user = await User.create({
    name: "Demo User",
    email: "demo@example.com",
    password: "password123"
  });

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  await Income.insertMany([
    { source: "Salary", amount: 5200, date: new Date(year, month, 1), userId: user._id },
    { source: "Freelance", amount: 900, date: new Date(year, month, 10), userId: user._id },
    { source: "Salary", amount: 5000, date: new Date(year, month - 1, 1), userId: user._id }
  ]);

  await Expense.insertMany([
    { title: "Rent", amount: 1550, category: "Housing", date: new Date(year, month, 2), notes: "Apartment", userId: user._id },
    { title: "Groceries", amount: 340, category: "Food", date: new Date(year, month, 4), notes: "Weekly food run", userId: user._id },
    { title: "Metro card", amount: 90, category: "Transport", date: new Date(year, month, 6), notes: "", userId: user._id },
    { title: "Movie night", amount: 72, category: "Entertainment", date: new Date(year, month, 12), notes: "Tickets and snacks", userId: user._id },
    { title: "Electric bill", amount: 140, category: "Utilities", date: new Date(year, month, 14), notes: "", userId: user._id },
    { title: "Dining out", amount: 180, category: "Food", date: new Date(year, month - 1, 8), notes: "", userId: user._id },
    { title: "Online course", amount: 220, category: "Education", date: new Date(year, month - 1, 15), notes: "", userId: user._id }
  ]);

  await Budget.create({
    monthlyLimit: 3000,
    month: month + 1,
    year,
    userId: user._id
  });

  console.log("Seed complete. Login with demo@example.com / password123");
  process.exit(0);
};

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
