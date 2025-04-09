import React from "react";

export default function AQIScale({ aqi }) {
  // Ensure AQI is within a valid range (0-100)
  const aqiValue = Math.max(0, Math.min(aqi, 100));
  // Convert AQI value to percentage for positioning
  const aqiPercentage = (aqiValue / 100) * 100;

  return (
    <div className="w-full max-w-3xl mx-auto mt-6 relative">
      {/* Gradient Scale */}
      <div className="relative w-full h-3 rounded-full overflow-hidden">
        <svg width="100%" height="100%">
          <defs>
            <linearGradient id="aqiGradient" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" style={{ stopColor: "green", stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: "yellow", stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: "red", stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#aqiGradient)" />
        </svg>
      </div>

      {/* AQI Indicator Line */}
      <div
        className="absolute top-[-8px] h-6 w-[2px] bg-black"
        style={{
          left: `calc(${aqiPercentage}% - 1px)`, // Adjust position to center it properly
        }}
      ></div>

      {/* Labels */}
      <div className="flex justify-between text-sm mt-1">
        <span>0</span>
        <span style={{ position: "absolute", left: `calc(${aqiPercentage}% - 10px)`, whiteSpace: "nowrap" }}>
          {aqi}
        </span>
        <span>100</span>
      </div>

      {/* Scale Title */}
      <p className="text-lg font-semibold text-gray-900 mt-2">good-o-meter scale</p>
    </div>
  );
}
