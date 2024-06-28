import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './Pages/Login/Login';
import EmployeesRecords from "./Pages/Employees Records/Employees Records"
import Frank from "./Pages/Frank’s Daily Records/Frank’s Daily Records"
import Add from "./Pages/Add Employee/Add Employee"
import SetLocation from "./Pages/Set Location/Set Location"
import Routes from './Routes'; // Adjust the path as necessary

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
                  <Routes />

    </>
  )
}

export default App
