import React, { useState, useEffect } from 'react';
import { FaBars, FaHome, FaUserPlus, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import logo from "../../../public/Images/SAS.png";

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
    window.addEventListener('resize', handleResize); // Add resize event listener
    return () => window.removeEventListener('resize', handleResize); // Clean up event listener
  }, []);

  return (
    <div className="sidebar-container">
      <FaBars className="hamburger-icon" onClick={toggleSidebar} />
      <nav className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "60px" }}>
          <img src={logo} alt="Logo" />
        </div>
        <ul style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: "60px" }}>
          <li style={{ backgroundColor: "#275959", width: "188px", height: "51px", borderRadius: "12px", marginTop: "30px" }}>
            <Link className='tex' to="/EmployeesRecords">
              <FaHome style={{ marginRight: "10px" }} /> Records
            </Link>
          </li>
          <li style={{ backgroundColor: "#275959", width: "188px", height: "51px", borderRadius: "12px", marginTop: "30px" }}>
            <Link className='tex' to="/AddEmployee">
              <FaUserPlus style={{ marginRight: "10px" }} /> Add Employee
            </Link>
          </li>
          <li style={{ backgroundColor: "#275959", width: "188px", height: "51px", borderRadius: "12px", marginTop: "30px" }}>
            <Link className='tex' to="/SetLocation">
              <FaMapMarkerAlt style={{ marginRight: "10px" }} /> Set Location
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
