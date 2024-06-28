import React from 'react';
import Sidebar from '../../Components/SIdebar/Sidebar'; // Adjust path as necessary
import './Set Location.css'; // Ensure correct CSS file path
import { FaMapMarkerAlt } from 'react-icons/fa'; // Import required icons from react-icons/fa

const SetLocation = () => {
  return (
    <div className="home-container">
      <Sidebar />
      <div className="content">
        <h1 className='head' style={{ marginBottom: "100px" }}>Set Location</h1>
        <div className="form-container">
          <div className="input-container">
            <div className="input-group">
              <input type="text" className="input-field" placeholder="Range" />
              <FaMapMarkerAlt style={{ color: '#154a4a' }} className="input-icon" /> {/* Use FaMapMarkerAlt icon component */}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>

     <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509385!2d144.96305791590428!3d-37.81362797975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d7fc1358c1e5!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1619096692450!5m2!1sen!2sau"
            width="600"
            height="450"
            style={{ border: 0, width: "707.76px", height: "460.15px", marginTop: "20px" }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
     </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button type="button" className="btn btn-info">Set</button>
        </div>
        <div className="map-container">
          {/* Add your map component or embed code here */}
        
        </div>
      </div>
    </div>
  );
};

export default SetLocation;
