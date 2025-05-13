import express from 'express';
import {
  getMeetingsForFaculty,
  submitRSVP
} from '../controllers/meetingController.js';

const router = express.Router();

router.get('/:facultyName', getMeetingsForFaculty);
router.post('/rsvp', submitRSVP);

export default router;
