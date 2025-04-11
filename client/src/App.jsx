import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Button} from '@mui/material'
import CalendarComponent from "./components/Calender.jsx";
import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/Login.jsx'
import LoadingPage from './pages/Loading.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        {/* <CalendarComponent />; */}
        <Routes>
          <Route path="/" element={<LoadingPage/>}/>
          <Route path="/student" element={<LoginPage/>}/>
        </Routes>
    </>
  )
}

export default App
