import React, { useState } from 'react';
import Sidebar from '../../Components/SIdebar/Sidebar'; // Adjust path as necessary
import './Set Location.css'; // Ensure correct CSS file path
import { FaMapMarkerAlt } from 'react-icons/fa'; // Import required icons from react-icons/fa

const SetLocation = () => {
  const [location, setLocation] = useState('');
  const [mapSrc, setMapSrc] = useState('https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509385!2d144.96305791590428!3d-37.81362797975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d7fc1358c1e5!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1619096692450!5m2!1sen!2sau');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSearch = () => {
    const newMapSrc = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(location)}`;
    setMapSrc(newMapSrc);
  };

  const handleSetLocation = async () => {
    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=YOUR_API_KEY`);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        setLatitude(lat);
        setLongitude(lng);
        console.log('Latitude:', lat, 'Longitude:', lng);
      } else {
        console.error('No results found');
      }
    } catch (error) {
      console.error('Error fetching geocode data:', error);
    }
  };

  return (
    <div className="home-container">
      <Sidebar />
      <div className="content">
        <h1 className='head' style={{ marginBottom: "100px" }}>Set Location</h1>
        <div className="form-container">
          <div className="input-container">
            <div className="input-group">
              <input type="text" className="input-field" placeholder="Range" />
              <FaMapMarkerAlt style={{ color: '#154a4a' }} className="input-icon" />
            </div>
            <div className="input-group">
              <input
                type="text"
                className="input-field"
                placeholder="Search location"
                value={location}
                onChange={handleLocationChange}
              />
              <FaMapMarkerAlt style={{ color: '#154a4a' }} className="input-icon" />
            </div>
            <button type="button" className="btn btn-info" onClick={handleSearch}>Search</button>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <iframe
            src={mapSrc}
            width="600"
            height="450"
            style={{ border: 0, width: "707.76px", height: "460.15px", marginTop: "20px" }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button type="button" className="btn btn-info" onClick={handleSetLocation}>Set</button>
        </div>
        <div className="map-container">
          {/* Add your map component or embed code here */}
        </div>
      </div>
    </div>
  );
};

export default SetLocation;
