// controllers/timetableController.js
import db from '../config/db.js';

// Get timetable dynamically using faculty ID from query parameter
export const getFacultyTimetable = async (req, res) => {
  const facultyId = req.params.faculty_id; // Get faculty_id from query

  if (!facultyId) {
    return res.status(400).json({ error: 'Faculty ID is required' });
  }

  try {
    const result = await db.query(
      `SELECT faculty_id, course_code, course_name, room, day, time_slot
       FROM faculty.periods
       WHERE faculty_id = $1`,
      [facultyId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching faculty timetable:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
