import React, { useState } from "react";
import axios from "axios";
import { GoogleMap, LoadScript, Autocomplete } from "@react-google-maps/api";

const GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY"; // Replace with your actual API key
const RAPIDAPI_KEY = "YOUR_RAPIDAPI_KEY"; // Replace with your actual RapidAPI key

const App = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [flights, setFlights] = useState([]);

  const fetchFlights = async () => {
    try {
      const response = await axios.get("https://your-rapidapi-url", {
        params: {
          from,
          to,
          departureDate,
        },
        headers: {
          "X-RapidAPI-Key": RAPIDAPI_KEY,
          "X-RapidAPI-Host": "your-rapidapi-host",
        },
      });
      setFlights(response.data);
    } catch (error) {
      console.error("Error fetching flights:", error);
    }
  };

  return (
    <div className="container">
      <h2>Google Flights Clone</h2>
      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={["places"]}>
        <Autocomplete onPlaceChanged={() => setFrom(document.getElementById("from").value)}>
          <input id="from" type="text" placeholder="From" />
        </Autocomplete>
        <Autocomplete onPlaceChanged={() => setTo(document.getElementById("to").value)}>
          <input id="to" type="text" placeholder="To" />
        </Autocomplete>
      </LoadScript>

      <input type="date" onChange={(e) => setDepartureDate(e.target.value)} />
      <button onClick={fetchFlights}>Search Flights</button>

      {flights.length > 0 && (
        <div>
          <h3>Available Flights</h3>
          <ul>
            {flights.map((flight, index) => (
              <li key={index}>{flight.airline} - {flight.price}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
