import React from 'react';

const TimeandLocation = ({ weather: { formattedLocalTime, name, country } }) => {
  return (
    <div>
      <div className="flex items-center justify-center my-6">
        <p className="text-xl font-extralight text-amber-50">{formattedLocalTime}</p>
      </div>
      <div className="flex items-center justify-center my-3">
        <p className="text-3xl font-medium text-amber-50">{`${name}, ${country}`}</p>
      </div>
    </div>
  );
}

export default TimeandLocation;
