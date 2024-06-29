import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddEmployee from "./Pages/Add Employee/Add Employee";
import DailyRecords from "./Pages/Daily Records/Daily Records";
import EmployeesRecords from "./Pages/Employees Records/Employees Records";
import Login from "./Pages/Login/Login";
import SetLocation from "./Pages/Set Location/Set Location"
// 
const ProjectRoutes = () => {
  return (
    <React.Suspense fallback={<>Loading...</>}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/AddEmployee" element={<AddEmployee />} />
          <Route path="/DailyRecords" element={<DailyRecords />} />
          <Route path="/EmployeesRecords" element={<EmployeesRecords />} />
          <Route path="/SetLocation" element={<SetLocation />} />



        </Routes>
      </Router>
    </React.Suspense>
  );
};
export default ProjectRoutes;
