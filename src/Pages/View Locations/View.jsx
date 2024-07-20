import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/SIdebar/Sidebar";
import "./View.css";
import { Link } from "react-router-dom";
import arrow from "../../Images/shortcut.png";
import api from "../../axios";
import { FaTrashAlt } from "react-icons/fa";

const Locations = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await api.get("/locations/get_locations");
        setRecords(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecords();
  }, []);

  const generateGoogleMapsUrl = (lat, long) => {
    return `https://www.google.com/maps?q=${lat},${long}`;
  };
  const handleDeleteLocation = async (locationID) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this location?");
    if (!isConfirmed) {
      return;
    }

    try {
      await api.delete(`/locations/delete_location/${locationID}`);
      // Update users state after deletion
      setRecords(records.filter(record => record.id !== locationID));
      window.alert(`Location deleted successfully.`);
    } catch (error) {
      window.alert(`Error deleting Location with ID ${locationID}: ${error}`);
    }
  };

  return (
    <div className="home-container">
      <Sidebar />
      <div className="content">
        <h1 className="head">Locations</h1>
        <div className="table-responsive bv">
          <table className="table">
            <thead>
              <tr>
                <th>Location Name</th>
                <th>Location Radius</th>
                <th>Map View </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {records?.map((record) => (
                <tr key={record.id}>
                  <td>{record.location_name}</td>
                  <td>{record.radius }</td>
                  <td>
                    <a
                      style={{textDecoration:"none"}}
                      href={generateGoogleMapsUrl(record.latitude, record.longitude)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on Map
                    </a>
                  </td>
                  <td>
                  <button
                      className="delete-btn"
                      onClick={() => handleDeleteLocation(record.id)}
                    >
                      <FaTrashAlt /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Locations;
