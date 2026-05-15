import jwt from "jsonwebtoken";
import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";

export const protect = asyncHandler(async (req, _res, next) => {
  const bearer = req.headers.authorization?.startsWith("Bearer ")
    ? req.headers.authorization.split(" ")[1]
    : null;
  const token = req.cookies?.token || bearer;

  if (!token) {
    const error = new Error("Not authorized, token missing");
    error.statusCode = 401;
    throw error;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      const error = new Error("Not authorized, user not found");
      error.statusCode = 401;
      throw error;
    }

    req.user = user;
    next();
  } catch {
    const error = new Error("Not authorized, token invalid");
    error.statusCode = 401;
    throw error;
  }
});
