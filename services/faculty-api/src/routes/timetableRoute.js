// routes/timetableRoute.js
import express from 'express';
import { getFacultyTimetable } from '../controllers/timetableController.js';

const router = express.Router();
router.get('/:faculty_id', getFacultyTimetable);
export default router;
