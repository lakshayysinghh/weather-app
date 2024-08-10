import React, { useState, useEffect } from 'react';
import { FaSearch } from "react-icons/fa";
import { MdMyLocation } from "react-icons/md";

const Inputs = ({ setQuery, setUnits }) => {
  const [city, setCity] = useState('');
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const updateDateTime = () => {
      setCurrentDateTime(new Date());
    };

    // Update the date and time every second
    const intervalId = setInterval(updateDateTime, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleSearchClick = () => {
    if (city !== "") setQuery({ q: city });
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setQuery({ lat: latitude, lon: longitude });
      });
    }
  };

  const formatDateTime = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  return (
    <div className="flex flex-col items-center my-6">
      <div className="flex flex-row w-3/4 items-center space-x-4 justify-center mb-4">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          type="text"
          placeholder="Search by city..."
          className="text-gray-500 text-lg font-heavy p-2 w-full shadow-xl capitalize focus:outline-none placeholder:lowercase"
        />
        <FaSearch
          size={25}
          className="cursor-pointer transition ease-out hover:scale-125 text-white"
          onClick={handleSearchClick}
        />
        <MdMyLocation
          size={25}
          className="cursor-pointer transition ease-out hover:scale-125 text-white"
          onClick={handleLocationClick}
        />
        <div className="flex flex-row w-1/4 items-center justify-center">
          <button
            className="text-2xl font-medium transition ease-out hover:scale-125 text-amber-50"
            onClick={() => setUnits("metric")}
          >
            °C
          </button>
          <p className="text-2xl font-medium mx-1 text-amber-50">|</p>
          <button
            className="text-2xl font-medium transition ease-out hover:scale-125 text-amber-50"
            onClick={() => setUnits("imperial")}
          >
            °F
          </button>
        </div>
      </div>
      <div className="text-amber-50 text-lg font-medium">
        {formatDateTime(currentDateTime)}
      </div>
    </div>
  );
};

export default Inputs;

