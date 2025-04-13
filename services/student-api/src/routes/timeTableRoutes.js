import express from "express";
import authMiddleWare from "../middleWares/authMiddleWare.js";
import {getFixedTimetable} from "../controllers/timeTableController.js";
const router = express.Router();

/**
 * Route: GET /api/student/fixed_timetable
 * Functionality: Fetches the fixed timetable for a student based on their registration number.
 * Input:
 *   Header: { authorization: "Bearer token" }
 * Output: Body: { timetable: [{ day: String, slots: [{ period_no: Number, course_name: String, faculty_name: String, room_no: String }] }] }
 */
router.get('/fixed-timetable', authMiddleWare, getFixedTimetable);



export default router;