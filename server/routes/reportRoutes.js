import express from "express";
import { monthlyReport } from "../controllers/reportController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.get("/monthly", monthlyReport);

export default router;
