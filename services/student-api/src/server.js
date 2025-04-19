import express from 'express';
import cors from 'cors'


import authRoutes from './routes/authRoutes.js'

import authMiddleware from "./middleWares/authMiddleWare.js";
import studentRoutes from "./routes/studentRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js"

import timeTableRoutes from './routes/timeTableRoutes.js'


const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/student/auth',authRoutes);
app.use('/student/profile',authMiddleware,studentRoutes);
app.use('/student/enroll',enrollmentRoutes);
app.use('/student/calendar',timeTableRoutes)




app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}/`);
});

