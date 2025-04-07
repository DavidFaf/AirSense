import React from "react";

export default function ForecastCard({
  date,
  aqi,
  pollutant,
  concentration,
  bgColor,
  source,
}) {
  return (
    <div className="w-64 rounded-xl drop-shadow-sm overflow-hidden">
      {/* Top Section */}
      <div className={`${bgColor} p-4 flex justify-between items-center`}>
        <span className="text-[17px] font-semibold"> {date} </span>

        <div className="text-center">
          <div className="border-2 border-black rounded-lg px-4 py-2">
            <p className="text-xl font-bold">{aqi}</p>
            <p className="text-xs">AQI</p>
          </div>
          {/* Source label below AQI box */}
          {source && (
            <p className="text-[10px] mt-1 text-gray-700 italic">{source}</p>
          )}
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
          <span>{concentration}</span>
        </p>
      </div>
    </div>
  );
}
