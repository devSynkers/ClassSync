import express from "express";
import db from "../config/db.js";

const app = express();
app.use(express.json());

export const userProfile = async (req, res) => {
    const roll_no = req.user.roll_no;
    console.log(roll_no);
    const query = "SELECT * FROM student.students WHERE reg_no = $1";
    const values = [roll_no];

    try {
        const result = await db.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Student not found" });
        }

        console.log(result.rows[0]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("DB Query Error:", error);
        res.status(500).send({ error: "Some error occurred while fetching profile" });
    }
};
