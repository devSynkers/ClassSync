import db from "../config/db.js";


export const getCourses = async (req, res) => {
    const reg_no = req.user.reg_no;
console.log(req.user);


//refine code include bactch id

    const query =
        "SELECT c.code AS course_code, c.name AS course_name, f.name AS faculty_name " +
        "FROM student.enrollments e " +
        "JOIN admin.courses c ON e.course_id = c.id " +
        "JOIN admin.faculty_assignments fa ON fa.course_id = c.id " +
        "JOIN faculty.faculties f ON fa.faculty_id = f.id " +
        "JOIN student.students s ON e.student_id = s.id " +
        "WHERE e.status = 'ongoing' AND s.reg_no = $1;";


    try {
        const result = await db.query(query,[reg_no]);
        console.log(result);
        res.status(200).json({ courses: result.rows });
    } catch (err) {
        console.error("Error fetching courses:", err);
        res.status(500).json({ error: "Could not find courses" });
    }
};


