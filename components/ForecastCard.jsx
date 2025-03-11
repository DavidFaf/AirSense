import React from "react";

export default function ForecastCard({
  date,
  aqi,
  pollutant,
  concentration,
  bgColor,
}) {
  return (
    <div className="w-64 rounded-xl drop-shadow-sm overflow-hidden">
      {/* Top Section */}
      <div className={`${bgColor} p-4 flex justify-between items-center`}>
        <span className="text-lg font-semibold"> {date} </span>
        <div className="border-2 border-black rounded-lg px-4 py-2 text-center">
          <p className="text-xl font-bold">{aqi}</p>
          <p className="text-xs">AQI</p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-white p-3 text-sm text-gray-900 rounded-b-xl">
        <p className="flex justify-between">
          <span className="font-semibold">Main Pollutant:</span>{" "}
          <span>{pollutant}</span>
        </p>
        <p className="flex justify-between">
          <span className="font-semibold">{pollutant} Levels:</span>{" "}
          <span>{concentration} µg/m³</span>
        </p>
      </div>
    </div>
  );
}
