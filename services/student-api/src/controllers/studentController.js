import express from "express";
import db from "../config/db.js";

const app = express();
app.use(express.json());

export const studentProfile = async (req, res) => {
    const reg_no = req.user.reg_no;

    const query = "select s.name AS student_name,s.email, s.phone, s.reg_no,b.name AS batch_name,d.name AS department_name"+
        " FROM student.students s"+
         " JOIN admin.batches b"+
        " ON s.batch_id = b.id" +
        " JOIN admin.departments d" +
        " ON b.department_id = d.id" +
        " WHERE s.reg_no = $1;\n";


    const values = [reg_no];

    try {
        const result = await db.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("DB Query Error:", error);
        res.status(500).send({ error: "Some error occurred while fetching profile" });
    }
};

export const studentFeedback = async (req, res) => {
    const{student_id, faculty_id, course_id, feedback}=req.body;
    const roll_no = req.user.roll_no;
    const query = "INSERT INTO student.student_feedback (student_id, faculty_id, course_id, feedback_text,date) " +
        "VALUES ($1, $2, $3, $4,CURRENT_DATE);";
    const values= [student_id, faculty_id, course_id, feedback];

    try{
        const result = await db.query(query, values);
        res.status(200).send("sent successfully");
    }
    catch(error){
        console.log(error);
        res.status(500).send({ error: "ERROR INSERTING QUERY"});
    }


}