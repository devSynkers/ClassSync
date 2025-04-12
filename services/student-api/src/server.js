import express from 'express';
import cors from 'cors'

import db from '../src/config/db.js';
import authRoutes from './routes/authRoutes.js'
import userRoutes from "./routes/studentRoutes.js";
import authMiddleware from "./middleWares/authMiddleWare.js";
import studentRoutes from "./routes/studentRoutes.js";
// import enrollmentRoutes from './routes/enrollmentRoutes'
// import notificationRoutes from './routes/notificationRoutes'
// import timeTableRoutes from './routes/timeTableRoutes'


const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/student/auth',authRoutes);
app.use('/student/profile',authMiddleware,studentRoutes);


// app.use('/student/enroll',enrollmentRoutes);
// app.use('/student/notify',notificationRoutes);
// app.use('/student/tt',timeTableRoutes);




app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}/`);
});

