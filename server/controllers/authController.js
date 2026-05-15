import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import { attachAuthCookie, signToken } from "../utils/token.js";

const sanitizeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  createdAt: user.createdAt
});

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const exists = await User.findOne({ email: email.toLowerCase() });

  if (exists) {
    const error = new Error("User already exists");
    error.statusCode = 409;
    throw error;
  }

  const user = await User.create({ name, email, password });
  const token = signToken(user._id);
  attachAuthCookie(res, token);

  res.status(201).json({ user: sanitizeUser(user), token });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email.toLowerCase() }).select("+password");

  if (!user || !(await user.matchPassword(password))) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const token = signToken(user._id);
  attachAuthCookie(res, token);

  res.json({ user: sanitizeUser(user), token });
});

export const profile = asyncHandler(async (req, res) => {
  res.json({ user: sanitizeUser(req.user) });
});

export const logout = asyncHandler(async (_req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});
