import express from "express";
import { getBudget, upsertBudget } from "../controllers/budgetController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";
import { budgetValidation } from "../validations/budgetValidation.js";

const router = express.Router();

router.use(protect);
router.route("/").get(getBudget).post(validate(budgetValidation), upsertBudget);

export default router;
