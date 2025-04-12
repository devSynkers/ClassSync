import React from "react";
import { Routes, Route } from 'react-router-dom'
import StudentLogin from './pages/student/StudentLogin.jsx'
import Landing from './pages/Landing.jsx'
import StudentLayout from "./layouts/StudentLayout.jsx";
import StudentDashboard from "./pages/student/StudentDashboard.jsx";
function App() {

  return (
    <>
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/login/student" element={<StudentLogin/>}/>
            <Route path="/student" element={<StudentLayout />}>
                <Route path="dashboard" element={<StudentDashboard />} />
                {/*<Route path="profile" element={<Profile />} />*/}
            </Route>
        </Routes>
    </>
  )
}

export default App
