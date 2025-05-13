import express from 'express';
import {
  getTodosByFacultyId,
  createTodo,
  toggleTodoCompletion,
} from '../controllers/todoController.js';

const router = express.Router();

// GET all to-dos for a faculty member
router.get('/:facultyId', getTodosByFacultyId);

// POST a new to-do task
router.post('/', createTodo);

// PATCH toggle task completion status
router.patch('/toggle/:id', toggleTodoCompletion);

export default router;
