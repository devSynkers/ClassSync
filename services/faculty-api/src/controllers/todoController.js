import db from '../config/db.js';

// GET all to-dos for a specific faculty
export const getTodosByFacultyId = async (req, res) => {
  const { facultyId } = req.params;

  try {
    const result = await db.query(
      `SELECT id, title, description, due_date AS "dueDate", completed, priority
       FROM faculty_todos
       WHERE faculty_id = $1
       ORDER BY created_at DESC`,
      [facultyId]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// POST a new task
export const createTodo = async (req, res) => {
  const { facultyId, title, description, dueDate, priority } = req.body;

  if (!title || !facultyId) {
    return res.status(400).json({ error: 'Title and facultyId are required' });
  }

  try {
    const result = await db.query(
      `INSERT INTO faculty_todos (faculty_id, title, description, due_date, priority)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, title, description, due_date AS "dueDate", completed, priority`,
      [facultyId, title, description, dueDate, priority]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// PATCH toggle completion status
export const toggleTodoCompletion = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query(
      `UPDATE faculty_todos
       SET completed = NOT completed
       WHERE id = $1
       RETURNING id, title, description, due_date AS "dueDate", completed, priority`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
