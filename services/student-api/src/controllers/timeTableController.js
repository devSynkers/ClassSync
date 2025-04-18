import db from '../config/db.js';

export const getFixedTimetable = async (req, res) => {
    const regNo = req.user.reg_no;

    try {
        // Get batch_id from student
        const studentResult = await db.query('SELECT batch_id FROM student.students WHERE reg_no = $1', [regNo]
        );

        if (studentResult.rows.length === 0) {
            return res.status(404).json({ error: "Student not found" });
        }

        const batchId = studentResult.rows[0].batch_id;

        // Get timetable slots for this batch
        const timetableQuery =
            "SELECT ts.day_of_week, ts.period_no, " +
            "c.name AS course_name, " +
            "f.name AS faculty_name, " +
            "ts.room_id " +
            "FROM admin.timetable_slots ts " +
            "JOIN admin.courses c ON ts.course_id = c.id " +
            "JOIN faculty.faculties f ON ts.faculty_id = f.id " +
            "WHERE ts.batch_id = $1 " +
            "ORDER BY " +
            "CASE ts.day_of_week " +
            "WHEN 'Monday' THEN 1 " +
            "WHEN 'Tuesday' THEN 2 " +
            "WHEN 'Wednesday' THEN 3 " +
            "WHEN 'Thursday' THEN 4 " +
            "WHEN 'Friday' THEN 5 " +
            "ELSE 6 " +
            "END, " +
            "ts.period_no;";

        const timetableResult = await db.query(timetableQuery, [batchId]);
        console.log(timetableResult)
        // Group by day_of_week
        const grouped = {};
        for (let row of timetableResult.rows) {
            if (!grouped[row.day_of_week]) {
                grouped[row.day_of_week] = [];
            }
            grouped[row.day_of_week].push({
                period_no: row.period_no,
                course_name: row.course_name,
                faculty_name: row.faculty_name,
                room_no: row.room_no,
            });
        }

        // Convert to array format for frontend
        const formatted = Object.entries(grouped).map(([day, slots]) => ({
            day,
            slots,
        }));

        res.status(200).json({ timetable: formatted });

    } catch (err) {
        console.error("Error fetching fixed timetable:", err);
        res.status(500).json({ error: "Could not fetch fixed timetable" });
    }
};
