import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import db from './config/db.js';
import authRoute from './routes/authRoute.js'

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// 🛡️ Middleware
app.use(cors());
app.use(express.json());

// 📌 Faculty Auth Routes
app.use('/faculty/auth', authRoute);


// 🚀 Start Server
app.listen(port, () => {
    console.log(`✅ Faculty server running at http://localhost:${port}/`);
});
