import React, { useState, useEffect } from "react";
import { FaBars, FaHome, FaUserPlus, FaMapMarkerAlt ,FaUsers  } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import logo from "../../Images/SAS.png";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleResize = () => {
    if (window.innerWidth > 768) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    handleResize(); // Check screen size on initial load
    window.addEventListener("resize", handleResize); // Add resize event listener
    return () => window.removeEventListener("resize", handleResize); // Clean up event listener
  }, []);

  return (
    <div className="sidebar-container">
      <FaBars className="hamburger-icon" onClick={toggleSidebar} />
      <nav className={`sidebar ${isOpen ? "open" : ""}`}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "60px",
          }}
        >
          <img src={logo} alt="Logo" />
        </div>
        <ul
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "60px",
          }}
        >
          <Link
            className="tex"
            to="/EmployeesRecords"
            style={{
              backgroundColor: "#275959",
              width: "188px",
              height: "51px",
              borderRadius: "12px",
              marginTop: "30px",
              textDecoration: "none",
              color: "white",
            }}
          >
            <li>
              <FaHome style={{ marginRight: "10px" }} /> Records
            </li>
          </Link>
          <Link
            className="tex"
            to="/users"
            style={{
              backgroundColor: "#275959",
              width: "188px",
              height: "51px",
              borderRadius: "12px",
              marginTop: "30px",
              textDecoration: "none",
              color: "white",
            }}
          >
            <li>
              <FaUsers style={{ marginRight: "10px" }} /> Users
            </li>
          </Link>
          <Link
            className="tex"
            to="/AddEmployee"
            style={{
              backgroundColor: "#275959",
              width: "188px",
              height: "51px",
              borderRadius: "12px",
              marginTop: "30px",
              textDecoration: "none",
              color: "white",
            }}
          >
            <li>
              <FaUserPlus style={{ marginRight: "10px" }} /> Add Employee
            </li>
          </Link>
          <Link
            className="tex"
            to="/SetLocation"
            style={{
              backgroundColor: "#275959",
              width: "188px",
              height: "51px",
              borderRadius: "12px",
              marginTop: "30px",
              textDecoration: "none",
              color: "white",
            }}
          >
            <li>
              <FaMapMarkerAlt style={{ marginRight: "10px" }} /> Set Location
            </li>
          </Link>
          <Link
            className="tex"
            to="/view-locations"
            style={{
              backgroundColor: "#275959",
              width: "188px",
              height: "51px",
              borderRadius: "12px",
              marginTop: "30px",
              textDecoration: "none",
              color: "white",
            }}
          >
            <li>
              <FaMapMarkerAlt style={{ marginRight: "10px" }} /> View Locations
            </li>
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
