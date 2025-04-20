// controllers/profileController.js
import db from '../config/db.js';

export const getFacultyById = async (req, res) => {
  const facultyId = req.params.id;

  try {
    const result = await db.query(
      `SELECT id, name, email, phone, designation, department, bio,
              joined_date, avatar, office_hours, teaching_areas, research_interests
       FROM faculty.faculties
       WHERE id = $1`,
      [facultyId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Faculty not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching faculty:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
