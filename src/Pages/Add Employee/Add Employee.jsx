import React from 'react';
import Sidebar from '../../Components/SIdebar/Sidebar'; // Adjust path as necessary
import './Add Employee.css'; // Ensure correct CSS file path
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa'; // Import required icons from react-icons/fa

const AddEmployee = () => {
  return (
    <div className="home-container">
      <Sidebar />
      <div className="content">
        <h1 className='head'style={{marginBottom:"150px"}}> Add Employee</h1>
        <div className="form-container">
          <div className="input-container">
            <input type="text" className="input-field" placeholder="Name" />
            <FaUser style={{ color: '#154a4a'}} className="input-icon" /> {/* Use FaUser icon component */}
           
          </div>
          <div className="input-container">
            <input type="email" className="input-field" placeholder="Email" />
            <FaEnvelope style={{ color: '#154a4a' }}className="input-icon" /> {/* Use FaEnvelope icon component */}
          </div>
          <div className="input-container">
            <input type="password" className="input-field" placeholder="Password" />
            <FaLock style={{ color: '#154a4a' }} className="input-icon" /> {/* Use FaLock icon component */}
          </div>
          <div className="input-container">
            <input type="password" className="input-field" placeholder="Confirm Password" />
            <FaLock style={{ color: '#154a4a' }} className="input-icon" /> {/* Use FaLock icon component */}
          </div>
        </div>
<div style={{display:"flex",justifyContent:"center"}}>
<button type="button" class="btn btn-info">Add</button>

</div>
      </div>
    </div>
  );
};

export default AddEmployee;
