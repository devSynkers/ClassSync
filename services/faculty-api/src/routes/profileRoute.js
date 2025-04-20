// routes/profileRoute.js
import express from 'express';
import { getFacultyById } from '../controllers/profileController.js';

const router = express.Router();

router.get('/:id', getFacultyById);

export default router;
