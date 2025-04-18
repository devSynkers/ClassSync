// calendarController.js

import db from '../config/db.js';

/**
 * Convert 'YYYY-MM-DD' to ['Mon', 'Tue', ...] format
 */
function formatToDayOfWeek(dateStr) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[new Date(dateStr).getDay()];
}

/**
 * Generate array of date strings from startDate to endDate inclusive
 */
function generateDatesBetween(start, end) {
    const dates = [];
    let current = new Date(start);
    const stop = new Date(end);
    while (current <= stop) {
        dates.push(current.toISOString().split('T')[0]);
        current.setDate(current.getDate() + 1);
    }
    return dates;
}

/**
 * Get dynamic calendar (static timetable + dynamic overrides)
 */
export const getDynamicCalendar = async (req, res) => {
    const { startDate, endDate } = req.query;
    const studentId = req.user.reg_no;

    try {
        // Step 1: Fetch student's batch_id
        const { rows: studentRows } = await db.query(`
            SELECT batch_id FROM student.students WHERE reg_no = $1
        `, [studentId]);

        if (!studentRows.length) {
            return res.status(404).json({ error: 'Student not found' });
        }

        const batchId = studentRows[0].batch_id;

        // Step 2: Fetch static timetable
        const { rows: staticSlots } = await db.query(`
            SELECT ts.day_of_week, ts.period_no, ts.course_id, ts.faculty_id, ts.room_id,
                   c.name AS course_name, f.name AS faculty_name
            FROM admin.timetable_slots ts
                     LEFT JOIN admin.courses c ON c.id = ts.course_id
                     LEFT JOIN faculty.faculties f ON f.id = ts.faculty_id
            WHERE ts.batch_id = $1
        `, [batchId]);

        // Step 3: Convert static slots into events within date range
        const calendarDays = generateDatesBetween(startDate, endDate);
        const staticEvents = [];

        for (const date of calendarDays) {
            const dow = formatToDayOfWeek(date); // 'Mon', 'Tue'...
            const slots = staticSlots.filter(slot => slot.day_of_week === dow);

            for (const slot of slots) {
                staticEvents.push({
                    date,
                    period_no: slot.period_no,
                    course_name: slot.course_name ?? 'Free Hour',
                    faculty_name: slot.faculty_name ?? 'N/A',
                    status: 'original',
                    is_exam: false,
                    note: null
                });
            }
        }

        // Step 4: Fetch dynamic overrides
        const { rows: overrideRows } = await db.query(`
            SELECT dtc.date, dtc.period_no, dtc.status, dtc.is_exam, dtc.note,
                   c.name AS course_name, f.name AS faculty_name
            FROM student.daily_timetable_cache dtc
                     LEFT JOIN admin.courses c ON c.id = dtc.course_id
                     LEFT JOIN faculty.faculties f ON f.id = dtc.faculty_id
            WHERE dtc.batch_id = $1
              AND dtc.date BETWEEN $2 AND $3
        `, [batchId, startDate, endDate]);

        // Step 5: Merge static and dynamic
        const calendarMap = new Map(); // key = `${date}-${period_no}`

        // Add static base
        staticEvents.forEach(ev => {
            const key = `${ev.date}-${ev.period_no}`;
            calendarMap.set(key, ev);
        });

        // Apply overrides
        overrideRows.forEach(ov => {
            const key = `${ov.date}-${ov.period_no}`;
            if (ov.status === 'cancelled') {
                calendarMap.delete(key); // Remove static class
            } else {
                calendarMap.set(key, {
                    date: ov.date,
                    period_no: ov.period_no,
                    course_name: ov.course_name ?? 'TBD',
                    faculty_name: ov.faculty_name ?? 'TBD',
                    status: ov.status, // 'swapped', 'extra', etc.
                    is_exam: ov.is_exam,
                    note: ov.note
                });
            }
        });

        const finalCalendar = Array.from(calendarMap.values());
        return res.json(finalCalendar);

    } catch (err) {
        console.error('❌ Error in getDynamicCalendar:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
