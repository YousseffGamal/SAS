import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/SIdebar/Sidebar"; // Adjust path as necessary
import "./Set Location.css"; // Ensure correct CSS file path
import { FaMapMarkerAlt } from "react-icons/fa"; // Import required icons from react-icons/fa
import api from "../../axios";

const SetLocation = () => {
  const [map, setMap] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [name, setName] = useState("");
  const [marker, setMarker] = useState(null); // State to hold the marker object
  const [markerLocation, setMarkerLocation] = useState(null);
  const [radius, setRadius] = useState();
  const [isSetButtonEnabled, setIsSetButtonEnabled] = useState(false);

  useEffect(() => {
    function initMap() {
      const mapContainer = document.getElementById("map-container");
      const mapOptions = {
        zoom: 13,
        center: { lat: 24.596080, lng: 46.705032 }, // Adjust center coordinates if needed
      };
      const newMap = new window.google.maps.Map(mapContainer, mapOptions); // Ensure window.google is used
      setMap(newMap);

      // Add a marker placement listener
      newMap.addListener("click", function (event) {
        console.log(event.latLng.toString());
        placeMarker(event.latLng); // Call placeMarker with clicked location
      });
    }

    if (window.google && window.google.maps) {
      initMap();
    }
  }, []);

  useEffect(() => {
    if (name  && radius) {
      setIsSetButtonEnabled(true);
    } else {
      setIsSetButtonEnabled(false);
    }
  }, [name, radius]);

  const placeMarker = (location) => {
    // If a marker already exists, remove it
    if (marker) {
      marker.setMap(null);
    }

    // Create a new marker
    const newMarker = new window.google.maps.Marker({
      position: location,
      map: map,
    });

    // Update marker state and location state
    setMarker(newMarker);
    setMarkerLocation(location);
  };

  const handleSearch = () => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: searchInput }, (results, status) => {
      if (status === window.google.maps.GeocoderStatus.OK && results[0]) {
        const location = results[0].geometry.location;
        map.setCenter(location);
        placeMarker(location); // Place a marker on the searched location
      } else {
        window.alert(
          "Geocode was not successful for the following reason: ",
          status
        );
      }
    });
  };

  const setLocation = async () => {
    try {
      if (markerLocation) {
        await api.post('/locations/add_location',
          {
            location_name: name,
            latitude: markerLocation.lat(),
            longitude: markerLocation.lng(),
            radius: radius
          }
        )
        window.alert('Location added successfully')
      }
    } catch (error) {
      window.alert('Error adding location')
    }
  }
  return (
    <div className="home-container">
      <Sidebar />
      <div className="content">
        <h1 className="head" style={{ marginBottom: "100px" }}>
          Set Location
        </h1>
        <div className="form-container">
          <div className="input-container">
            <input
              type="text"
              className="input-field"
              placeholder="Location name (ex work1)"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="number"
              className="input-field"
              placeholder="Radius in meter"
              value={radius}
              onChange={(e) => setRadius(e.target.value)}
            />
            <input
              type="text"
              className="input-field"
              placeholder="Search Location"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                type="button"
                className="btn btn-info"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div
          id="map-container"
          style={{
            margin: "auto",
            width: "700.76px",
            height: "460.15px",
            marginTop: "20px",
          }}
        ></div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button type="button" onClick={setLocation} className="btn btn-info" disabled={!isSetButtonEnabled}>
            Set
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetLocation;