import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddEmployee from "./Pages/Add Employee/Add Employee";
import EmployeeDailyRecords from "./Pages/Daily Records/Daily Records";
import EmployeesRecords from "./Pages/Employees Records/Employees Records";
import Login from "./Pages/Login/Login";
import SetLocation from "./Pages/Set Location/Set Location"
import UsersRecords from "./Pages/Users/Users";
import Locations from "./Pages/View Locations/View";
// 
const ProjectRoutes = () => {
  return (
    <React.Suspense fallback={<>Loading...</>}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/AddEmployee" element={<AddEmployee />} />
          <Route path="/employee-details/:employee_id" element={<EmployeeDailyRecords />} />
          <Route path="/EmployeesRecords" element={<EmployeesRecords />} />
          <Route path="/SetLocation" element={<SetLocation />} />
          <Route path="/users" element={<UsersRecords />} />
          <Route path="/view-locations" element={<Locations />} />



        </Routes>
      </Router>
    </React.Suspense>
  );
};
export default ProjectRoutes;
