import jwt from 'jsonwebtoken';
import db from '../config/db.js';
import dotenv from 'dotenv';

dotenv.config();

export const facultyLogin = async (req, res) => {
    const { id, password } = req.body;

    if (!id || !password) {
        return res.status(400).json({ error: "Faculty ID and password are required" });
    }

    try {
        const query = `SELECT id FROM faculty.faculties WHERE id = $1 AND password_hash = $2`;
        const values = [id, password];

        const result = await db.query(query, values);

        if (result.rows.length === 0) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            message: "Login successful",
            token
        });

    } catch (error) {
        console.error('Faculty login error:', error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
