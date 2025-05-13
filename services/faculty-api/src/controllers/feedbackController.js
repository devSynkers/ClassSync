import db from '../config/db.js';

// GET /faculty/feedback/:facultyId
export const getFeedbacksByFaculty = async (req, res) => {
  const { facultyId } = req.params;

  try {
    const result = await db.query(
      `SELECT id, student_name, student_id, subject, message, date, read
       FROM faculty.feedbacks
       WHERE faculty_id = $1
       ORDER BY date DESC`,
      [facultyId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
