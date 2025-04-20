import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import db from './config/db.js';
import authRoute from './routes/authRoute.js'
import profileRoute from "./routes/profileRoute.js"

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());


app.use('/faculty/auth', authRoute);
app.use('/faculty/profile',profileRoute)


// 🚀 Start Server
app.listen(port, () => {
    console.log(`✅ Faculty server running at http://localhost:${port}/`);
});
