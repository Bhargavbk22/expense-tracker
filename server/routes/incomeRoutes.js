import express from "express";
import { createIncome, deleteIncome, getIncome, updateIncome } from "../controllers/incomeController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";
import { incomeValidation } from "../validations/incomeValidation.js";

const router = express.Router();

router.use(protect);
router.route("/").get(getIncome).post(validate(incomeValidation), createIncome);
router.route("/:id").put(updateIncome).delete(deleteIncome);

export default router;
