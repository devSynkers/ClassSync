import React from "react";
import { Routes, Route } from 'react-router-dom'
import StudentSidebar from "./components/student/StudentSidebar.jsx";
import StudentLogin from './pages/student/StudentLogin.jsx'
import Landing from './pages/Landing.jsx'
import StudentDashboard from "./pages/student/StudentDashboard.jsx";
import StudentClassTimetable from "./pages/student/StudentClassTimetable.jsx";
import FacultyLogin from "./pages/faculty/FacultyLogin.jsx";
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import FacultyDashBoard from "./pages/faculty/FacultyDashBoard.jsx";
import StudentFeedback from "./pages/student/StudentFeedback.jsx";
import StudentProfile from "./pages/student/StudentProfile.jsx"
import FacultySidebar from "./components/faculty/FacultySidebar.jsx";
import FacultyFeedback from "./pages/faculty/FacultyFeedback.jsx";
import FacultyProfile from "./pages/faculty/FacultyProfile.jsx";
import { Navigate } from 'react-router-dom';
import FacultyLayout from "./layouts/faculty/FacultyLayout.jsx";
import FacultyTimeTable from "./pages/faculty/FacultyTimeTable.jsx";
import FacultyMeetings from "./pages/faculty/FacultyMeetings.jsx";
import FacultyToDo from "./pages/faculty/FacultyToDo.jsx";
import FacultySwapRequests from "./pages/faculty/FacultySwapRequests.jsx";


function App() {

  return (
    <>
        <Routes>
              <Route path='/' element={<Landing/>}/>
              <Route path="login/student" element={<StudentLogin/>}/>
              <Route path="login/faculty" element={<FacultyLogin/>}/>
              <Route path="login/admin" element={<AdminLogin/>}/>



            <Route path="/student" element={<StudentSidebar />}>
                <Route path="dashboard" element={<StudentDashboard />} />
                <Route path="calendar" element={<StudentDashboard />} />
                <Route path="classtimetable" element={<StudentClassTimetable />} />
                <Route path="feedback" element={<StudentFeedback />} />
                <Route path="profile" element={<StudentProfile />} />
                {/*<Route path="profile" element={<Profile />} />*/}
            </Route>

            <Route path="/faculty" element={<FacultyLayout />}>
  <Route path="dashboard" element={<FacultyDashBoard />} />
  <Route path="student-feedback" element={<FacultyFeedback />} />
  <Route path="profile" element={<FacultyProfile />} />
  <Route path="timetable" element={<FacultyTimeTable />} />
  <Route path="meetings" element={<FacultyMeetings/>} />
  <Route path="todo" element={<FacultyToDo />} />
  <Route path="swap-requests" element={<FacultySwapRequests/>} />
</Route>


        </Routes>
    </>
  )
}

export default App
