import express from "express";
import {getCourses} from "../controllers/enrollmentController.js";
import authMiddleware from "../middleWares/authMiddleWare.js";
const router = express.Router();

// router.post('/period',);


router.get("/courses",authMiddleware,getCourses)


export default router;
