import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddEmployee from "./Pages/addEmployee/addEmployee";
import EmployeeDailyRecords from "./Pages/dailyRecords/dailyRecords";
import EmployeesRecords from "./Pages/employeesRecords/employeesRecords";
import Login from "./Pages/Login/Login";
import SetLocation from "./Pages/Set Location/setLocation"
import UsersRecords from "./Pages/Users/Users";
import Locations from "./Pages/View Locations/View";
// 
const ProjectRoutes = () => {
  return (
    <React.Suspense fallback={<>Loading...</>}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/employee-details/:employee_id" element={<EmployeeDailyRecords />} />
          <Route path="/employees-records" element={<EmployeesRecords />} />
          <Route path="/set-location" element={<SetLocation />} />
          <Route path="/users" element={<UsersRecords />} />
          <Route path="/view-locations" element={<Locations />} />



        </Routes>
      </Router>
    </React.Suspense>
  );
};
export default ProjectRoutes;
