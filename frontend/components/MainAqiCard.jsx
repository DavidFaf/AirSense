import { calculateAQIInfo } from "@utils/calculateAQIInfo";

export default function MainAqiCard({ currentPollutants, currentWeather }) {
  const info = calculateAQIInfo(currentPollutants);
  const temperature = currentWeather?.main?.temp;
  const humidity = currentWeather?.main?.humidity;
  const windSpeed = currentWeather?.wind?.speed;

  if (!info)
    return (
      <div className="max-w-3xl mx-auto rounded-xl shadow-lg overflow-hidden">
        {/* AQI Summary Section */}
        <div className="p-4 flex bg-green-300">
          {/* AQI Value */}
          <div className="flex flex-col text-grey-900 items-center justify-center bg-green-400 rounded-lg px-6 py-2">
            <span className="text-3xl font-bold">xx</span>
            <span className="text-sm">AQI</span>
            <span className="font-secondary font-semibold mt-2">Good</span>
          </div>

          {/* AQI Causes & Health Recommendation */}
          <div className="ml-4 flex-1">
            <p className="text-sm font-semibold underline">Possible Causes:</p>
            <p className="text-sm italic text-gray-900">
              Enter a city above to view possible air pollution causes
            </p>

            <p className="text-sm font-semibold underline mt-2">
              Health Recommendation:
            </p>
            <p className="text-sm italic text-gray-900">
              Enter a city above to view possible air pollutants Recommendation
            </p>
          </div>
        </div>

        {/* Additional Details Section */}
        <div className="flex justify-between  py-4 px-6 text-sm text-gray-900">
          {/* Left Column */}
          <div>
            <p>
              <span className="font-regular">Main Pollutant:</span>{" "}
              <span className=" font-semibold">xxx</span>
            </p>
            <p>
              <span className="font-regular">xxx Levels:</span>{" "}
              <span className="font-semibold">xxx</span>
            </p>
          </div>

          {/* Right Column */}
          <div className="flex space-x-6">
            <p>
              <span className="font-regular">Temperature:</span>{" "}
              <span className="font-semibold">xx°C</span>
            </p>
            <p>
              <span className="font-regular">Humidity:</span>{" "}
              <span className="font-semibold">xxx</span>
            </p>
            <p>
              <span className="font-regular">Wind:</span>{" "}
              <span className="font-semibold">xxx km/h</span>
            </p>
          </div>
        </div>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto rounded-xl shadow-lg overflow-hidden">
      {/* AQI Summary Section */}
      <div className={`p-4 flex ${info ? info.bgColor : "bg-green-300"}`}>
        {/* AQI Value */}
        <div
          className={`flex flex-col text-black items-center justify-center ${
            info ? info.color : "bg-green-400"
          } rounded-lg px-6 py-2`}
        >
          <span className="text-3xl font-bold">{info.aqi}</span>
          <span className="text-sm">AQI</span>
          <span className="font-secondary font-semibold mt-2">
            {info.level}
          </span>
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
            <span className=" font-semibold">{info.mainPollutant}</span>
          </p>
          <p>
            <span className="font-regular">{info.mainPollutant} Levels:</span>{" "}
            <span className="font-semibold">{info.mainConcentration}</span>
          </p>
        </div>

        {/* Right Column */}
        <div className="flex space-x-6">
          <p>
            <span className="font-regular">Temperature:</span>{" "}
            <span className="font-semibold">{temperature}°C</span>
          </p>
          <p>
            <span className="font-regular">Humidity:</span>{" "}
            <span className="font-semibold">{humidity}</span>
          </p>
          <p>
            <span className="font-regular">Wind:</span>{" "}
            <span className="font-semibold">{windSpeed} km/h</span>
          </p>
        </div>
      </div>
    </div>
  );
}
