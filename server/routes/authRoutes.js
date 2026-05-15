import express from "express";
import { login, logout, profile, register } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";
import { loginValidation, registerValidation } from "../validations/authValidation.js";

const router = express.Router();

router.post("/register", validate(registerValidation), register);
router.post("/login", validate(loginValidation), login);
router.get("/profile", protect, profile);
router.post("/logout", protect, logout);

export default router;
