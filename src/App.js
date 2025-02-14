import React, { useState } from "react";
import axios from "axios";

const FLIGHTSSCRAPER_KEY = "1d0ecd1882mshfd667085d52308dp1c9e8fjsn751e50d95b16";
const MAPTILES_API_KEY = "Z1krOrZfLpLqjiy7DpIS";

const App = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [flights, setFlights] = useState([]);
  const [mapUrl, setMapUrl] = useState("");

  // Fetch flights from RapidAPI (Flights Scraper API)
  const fetchFlights = async () => {
    try {
      const response = await axios.get(
        "https://sky-scanner3.p.rapidapi.com/flights",
        {
          params: {
            from: from, // Departure airport/city
            to: to, // Destination airport/city
            departDate: departureDate,
            adults: "1",
            currency: "USD",
          },
          headers: {
            "X-RapidAPI-Key": FLIGHTSSCRAPER_KEY,
            "X-RapidAPI-Host": "sky-scanner3.p.rapidapi.com",
          },
        }
      );

      console.log(response.data); // Debugging: Check response structure
      setFlights(response.data.flights || []); // Update state with flight results
    } catch (error) {
      console.error("Error fetching flights:", error);
    }
  };

  // Load MapTiles (Alternative to Google Maps)
  const loadMap = () => {
    const baseUrl = `https://api.maptiler.com/maps/basic/?key=${MAPTILES_API_KEY}`;
    setMapUrl(baseUrl);
  };

  return (
    <div className="container">
      <h2>Flight Search</h2>

      <input
        type="text"
        placeholder="From"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
      />
      <input
        type="text"
        placeholder="To"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />
      <input type="date" onChange={(e) => setDepartureDate(e.target.value)} />

      <button onClick={fetchFlights}>Search Flights</button>
      <button onClick={loadMap}>Load Map</button>

      {mapUrl && (
        <iframe src={mapUrl} width="100%" height="400px" title="Map"></iframe>
      )}

      {flights.length > 0 && (
        <div>
          <h3>Available Flights</h3>
          <ul>
            {flights.map((flight, index) => (
              <li key={index}>
                Airline: {flight.airline} | Price: {flight.price} | Departure:{" "}
                {flight.departure_time}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
