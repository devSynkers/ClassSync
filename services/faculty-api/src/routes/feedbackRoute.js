import express from 'express';
import { getFeedbacksByFaculty } from '../controllers/feedbackController.js';

const router = express.Router();

router.get('/:facultyId', getFeedbacksByFaculty);

export default router;
