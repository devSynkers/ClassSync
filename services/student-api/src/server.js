import express from 'express';
import cors from 'cors'
import authRoutes from './routes/authRoutes'
import enrollmentRoutes from './routes/enrollmentRoutes'
import notificationRoutes from './routes/notificationRoutes'
import timeTableRoutes from './routes/timeTableRoutes'


const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/student/auth',authRoutes);
app.use('/student/enroll',enrollmentRoutes);
app.use('/student/notify',notificationRoutes);
app.use('/student/tt',timeTableRoutes);




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

