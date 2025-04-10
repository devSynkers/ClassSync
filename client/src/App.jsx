import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Button} from '@mui/material'
import CalendarComponent from "./components/Calender.jsx";
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <CalendarComponent />;
    </>
  )
}

export default App
