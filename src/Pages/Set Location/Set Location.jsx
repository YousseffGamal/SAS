import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/SIdebar/Sidebar"; // Adjust path as necessary
import "./Set Location.css"; // Ensure correct CSS file path
import api from "../../axios";

const SetLocation = () => {
  const [map, setMap] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [name, setName] = useState("");
  const [marker, setMarker] = useState(null); // State to hold the marker object
  const [markerLocation, setMarkerLocation] = useState(null);
  const [radius, setRadius] = useState("");
  const [isSetButtonEnabled, setIsSetButtonEnabled] = useState(false);

  useEffect(() => {
    const initMap = () => {
      const mapContainer = document.getElementById("map-container");
      if (!mapContainer) {
        console.error("Map container not found");
        return;
      }

      const mapOptions = {
        zoom: 13,
        center: { lat: 24.59608, lng: 46.705032 }, // Adjust center coordinates if needed
      };

      try {
        const newMap = new window.google.maps.Map(mapContainer, mapOptions);
        setMap(newMap);

        // Add a click listener to the map to place a marker
        newMap.addListener("click", (event) => {
          console.log("Map clicked at: ", event.latLng.toString());
          placeMarker(event.latLng);
        });
      } catch (error) {
        console.error("Error initializing map: ", error);
      }
    };

    // Listen for the event triggered by the Google Maps API callback
    window.addEventListener('mapsLoaded', initMap);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('mapsLoaded', initMap);
    };
  }, []);

  useEffect(() => {
    if (name && radius && markerLocation) {
      setIsSetButtonEnabled(true);
    } else {
      setIsSetButtonEnabled(false);
    }
  }, [name, radius, markerLocation]);

  const placeMarker = (location) => {
    try {
      // If a marker already exists, remove it
      if (marker) {
        marker.setMap(null);
      }

      // Create a new marker
      const newMarker = new window.google.maps.Marker({
        position: location,
        map: map,
        title: "Selected Location",
        animation: window.google.maps.Animation.DROP,
      });

      console.log("Marker placed at: ", location.toString());

      // Update marker state and location state
      setMarker(newMarker);
      setMarkerLocation(location);
    } catch (error) {
      console.error("Error placing marker: ", error);
    }
  };

  const handleSearch = () => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: searchInput }, (results, status) => {
      if (status === window.google.maps.GeocoderStatus.OK && results[0]) {
        const location = results[0].geometry.location;
        map.setCenter(location); // Center the map on the searched location
      } else {
        window.alert(
          "Geocode was not successful for the following reason: " + status
        );
      }
    });
  };

  const setLocation = async () => {
    try {
      if (markerLocation) {
        await api.post('/locations/add_location', {
          location_name: name,
          latitude: markerLocation.lat(),
          longitude: markerLocation.lng(),
          radius: radius
        });
        window.alert('Location added successfully');
      }
    } catch (error) {
      window.alert('Error adding location');
    }
  };

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
          <button
            type="button"
            onClick={setLocation}
            className="btn btn-info"
            disabled={!isSetButtonEnabled}
          >
            Set
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetLocation;
