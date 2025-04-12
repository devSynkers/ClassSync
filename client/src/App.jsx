import React from "react";
import { Routes, Route } from 'react-router-dom'
import StudentLogin from './pages/student/StudentLogin.jsx'
import LandingLayout from './layouts/LandingLayout.jsx'
import Landing from './pages/Landing.jsx'
import StudentLayout from "./layouts/student/StudentLayout.jsx";
import StudentDashboard from "./pages/student/StudentDashboard.jsx";
function App() {

  return (
    <>
        <Routes>
          <Route path="/" element={<LandingLayout/>}>
              <Route path='login' element={<Landing/>}/>
              <Route path="login/student" element={<StudentLogin/>}/>

          </Route>

            <Route path="/student" element={<StudentLayout />}>
                <Route path="dashboard" element={<StudentDashboard />} />
                {/*<Route path="profile" element={<Profile />} />*/}
            </Route>
        </Routes>
    </>
  )
}

export default App
