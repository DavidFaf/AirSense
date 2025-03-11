export default function MainAqiCard() {
  return (
    <div className="max-w-3xl mx-auto rounded-xl shadow-lg overflow-hidden">
      {/* AQI Summary Section */}
      <div className="bg-green-300 p-4 flex">
        {/* AQI Value */}
        <div className="flex flex-col text-black items-center justify-center bg-green-400 rounded-lg px-6 py-2">
          <span className="text-3xl font-bold">87</span>
          <span className="text-sm">AQI</span>
          <span className="font-secondary font-semibold mt-2">Good</span>
        </div>

        {/* AQI Causes & Health Recommendation */}
        <div className="ml-4 flex-1">
          <p className="text-sm font-semibold underline">Possible Causes:</p>
          <p className="text-sm text-gray-900">
            Low wind speed & traffic congestion
          </p>

          <p className="text-sm font-semibold underline mt-2">
            Health Recommendation:
          </p>
          <p className="text-sm  text-gray-900">
            Limit outdoor activities between <strong>3 PM - 6 PM</strong> as
            pollution levels are expected to peak. If you need to go outside,
            consider wearing an <strong>N95 mask</strong>.
          </p>
        </div>
      </div>

      {/* Additional Details Section */}
      <div className="flex justify-between  py-4 px-6 text-sm text-gray-900">
        {/* Left Column */}
        <div>
          <p>
            <span className="font-regular">Main Pollutant:</span>{" "}
            <span className=" font-semibold">PM2.5</span>
          </p>
          <p>
            <span className="font-regular">PM2.5 Levels:</span>{" "}
            <span className="font-semibold">8.6µg/m³ (Moderate)</span>
          </p>
        </div>

        {/* Right Column */}
        <div className="flex space-x-6">
          <p>
            <span className="font-regular">Temperature:</span>{" "}
            <span className="font-semibold">18°C</span>
          </p>
          <p>
            <span className="font-regular">Humidity:</span>{" "}
            <span className="font-semibold">72%</span>
          </p>
          <p>
            <span className="font-regular">Wind:</span>{" "}
            <span className="font-semibold">16 km/h</span>
          </p>
        </div>
      </div>
    </div>
  );
}
