import React, { useState } from "react";
import Sidebar from "../../Components/SIdebar/Sidebar"; // Adjust path as necessary
import "./Add Employee.css"; // Ensure correct CSS file path
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa"; // Import required icons from react-icons/fa
import api from "../../axios";

const AddEmployee = () => {
  const [employeeCreds, setEmployeeCreds] = useState({
    userName: "",
    email:"",
    password: "",
    confirmPassword: "",
    user_type: "employee"
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeCreds((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (employeeCreds.password === employeeCreds.confirmPassword) {
      try {
        let res = await api.post('/users/create_user',
          {
            email: employeeCreds.email,
            password: employeeCreds.password,
            username: employeeCreds.userName,
            user_type: employeeCreds.user_type
          }
        )
        if (res.data.user_id) {
          alert(`${employeeCreds.user_type} added successfully`)
        } else {
          alert('An error occurred, please try again later')
        }
      } catch (error) {
        if (error.response === undefined) {
          alert('Bad request ! please try again later')
        }else {
          alert("An error occurred, please try again later.");
        }
      }
    } else {
      alert('Passwords do not match');
    }
    
  }
  return (
    <div className="home-container">
      <Sidebar />
      <div className="content">
        <h1 className="head" style={{ marginBottom: "150px" }}>
          {" "}
          Add Employee
        </h1>
        <div className="form-container">
          <div className="input-container">
            <input required type="text" className="input-field" name="userName" onChange={handleChange} placeholder="Username" />
            <FaUser style={{ color: "#154a4a" }} className="input-icon" />{" "}
            {/* Use FaUser icon component */}
          </div>
          <div className="input-container">
            <input required type="email" className="input-field" name="email" onChange={handleChange} placeholder="Email" />
            <FaEnvelope
              style={{ color: "#154a4a" }}
              className="input-icon"
            />{" "}
            {/* Use FaEnvelope icon component */}
          </div>
          <div className="input-container">
            <input
              type="password"
              className="input-field"
              placeholder="Password"
              name="password"
              required
              onChange={handleChange}
            />
            <FaLock style={{ color: "#154a4a" }} className="input-icon" />{" "}
            {/* Use FaLock icon component */}
          </div>
          <div className="input-container">
            <input
              type="password"
              className="input-field"
              placeholder="Confirm Password"
              name="confirmPassword"
              required
              onChange={handleChange}
            />
            <FaLock style={{ color: "#154a4a" }} className="input-icon" />{" "}
            {/* Use FaLock icon component */}
          </div>
          <div className="input-container">
            <select
              className="input-field"
              name="user_type"
              onChange={handleChange}
            >
              <option value="" disabled selected>Select user type</option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
              </select>
            <FaUser style={{ color: "#154a4a" }} className="input-icon" />{" "}
            {/* Use FaLock icon component */}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button type="submit" className="btn btn-info" onClick={handleSubmit}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
