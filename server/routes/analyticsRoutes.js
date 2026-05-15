import express from "express";
import { categoryAnalytics, monthlyAnalytics, summaryAnalytics } from "../controllers/analyticsController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.get("/monthly", monthlyAnalytics);
router.get("/categories", categoryAnalytics);
router.get("/summary", summaryAnalytics);

export default router;
