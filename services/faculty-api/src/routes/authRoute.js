import express from "express";
import { facultyLogin } from "../controllers/authController.js"
import authMiddleware from "../middlewares/authMiddleWare.js";

const router = express.Router();

// 🔐 Public route: Faculty login
router.post('/login', facultyLogin);


export default router;
