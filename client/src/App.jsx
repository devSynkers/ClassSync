import React from "react";
import { Routes, Route } from 'react-router-dom'
import StudentSidebar from "./components/student/StudentSidebar.jsx";
import StudentLogin from './pages/student/StudentLogin.jsx'
import Landing from './pages/Landing.jsx'
import StudentLayout from "./layouts/students/StudentLayout.jsx";
import StudentDashboard from "./pages/student/StudentDashboard.jsx";
import StudentClassTimetable from "./pages/student/StudentClassTimetable.jsx";
import FacultyLogin from "./pages/faculty/FacultyLogin.jsx";
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import FacultyDashBoard from "./pages/faculty/FacultyDashBoard.jsx";
import StudentFeedback from "./pages/student/StudentFeedback.jsx";
import StudentProfile from "./pages/student/StudentProfile.jsx"
import StudentCalendar from "./components/student/StudentCalendar.jsx";
function App() {

  return (
    <>
        <Routes>
              <Route path='/' element={<Landing/>}/>
              <Route path="login/student" element={<StudentLogin/>}/>
              <Route path="login/faculty" element={<FacultyLogin/>}/>
              <Route path="login/admin" element={<AdminLogin/>}/>
              <Route path="/faculty/dashboard" element={<FacultyDashBoard/>}/>


            <Route path="/student" element={<StudentSidebar />}>
                <Route path="dashboard" element={<StudentDashboard />} />
                <Route path="calendar" element={<StudentDashboard />} />
                <Route path="classtimetable" element={<StudentClassTimetable />} />
                <Route path="feedback" element={<StudentFeedback />} />
                <Route path="profile" element={<StudentProfile />} />
                {/*<Route path="profile" element={<Profile />} />*/}
            </Route>
        </Routes>
    </>
  )
}

export default App
