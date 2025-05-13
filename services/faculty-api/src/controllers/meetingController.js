import db from '../config/db.js';

// GET /api/meetings/:facultyName
export const getMeetingsForFaculty = async (req, res) => {
  const { facultyName } = req.params;

  try {
    const result = await db.query(
      `
      SELECT 
        m.id,
        m.title,
        m.meeting_date AS date,
        TO_CHAR(m.start_time, 'HH12:MI AM') AS "startTime",
        TO_CHAR(m.end_time, 'HH12:MI AM') AS "endTime",
        m.location,
        m.description,
        m.attendees,
        COALESCE(r.status, 'Not Responded') AS rsvp_status
      FROM admin.meetings m
      LEFT JOIN faculty.rsvps r
        ON m.id = r.meeting_id AND r.faculty_name = $1
      ORDER BY m.meeting_date ASC, m.start_time ASC
      `,
      [facultyName]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching meetings:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// POST /api/meetings/rsvp
export const submitRSVP = async (req, res) => {
  const { meetingId, facultyName, status } = req.body;

  if (!['RSVP', 'Declined'].includes(status)) {
    return res.status(400).json({ error: 'Invalid RSVP status' });
  }

  try {
    await db.query(
      `
      INSERT INTO faculty.rsvps (meeting_id, faculty_name, status)
      VALUES ($1, $2, $3)
      ON CONFLICT (meeting_id, faculty_name)
      DO UPDATE SET status = EXCLUDED.status, responded_at = NOW()
      `,
      [meetingId, facultyName, status]
    );

    res.json({ message: 'RSVP recorded successfully' });
  } catch (error) {
    console.error('Error submitting RSVP:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
