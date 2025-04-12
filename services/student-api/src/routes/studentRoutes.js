import express from "express";

import {studentFeedback, studentProfile} from "../controllers/studentController.js"
import authMiddleware from "../middleWares/authMiddleWare.js";

const router = express.Router();

router.get("/me",authMiddleware,studentProfile);
router.post("/feedback",studentFeedback);

export default router;