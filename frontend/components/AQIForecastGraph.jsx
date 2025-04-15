import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { calculateAQIInfo } from "@utils/calculateAQIInfo";

export default function AQIForecastGraph({ forecastData, arimaForecast }) {
  const isEmpty = !forecastData?.list?.length && !arimaForecast?.list?.length;

  if (isEmpty) {
    return (
      <div className="mt-5 mb-10">
        <h2 className="text-lg text-gray-600 font-bold">Forecast graph</h2>
        <div className="h-64 flex items-center justify-center bg-gray-50 text-gray-500 border border-gray-200 rounded-md">
          No forecast data yet
        </div>
      </div>
    );
  }

  const formatForecast = (list, source) =>
    list?.map((entry) => {
      const info = calculateAQIInfo({ list: [entry] });
      const date = new Date(entry.dt * 1000);
      const day = date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });

      return {
        date: date.toDateString(),
        day,
        [`AQI_${source}`]: info?.aqi ?? 0,
      };
    }) || [];

  const openWeatherAQI = formatForecast(forecastData?.list, "OpenWeather");
  const arimaAQI = formatForecast(arimaForecast?.list, "ARIMA");

  // Merge data by date
  const mergedMap = new Map();
  [...openWeatherAQI, ...arimaAQI].forEach((entry) => {
    if (!mergedMap.has(entry.date)) {
      mergedMap.set(entry.date, { day: entry.day });
    }
    const existing = mergedMap.get(entry.date);
    Object.assign(existing, entry);
  });

  const mergedData = Array.from(mergedMap.values());

  return (
    <div className="mt-5 mb-10">
      <h2 className="text-lg text-gray-600 font-bold">Forecast graph</h2>
      <div className="mt-6 w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart key={JSON.stringify(mergedData)} data={mergedData}>
            <XAxis dataKey="day" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="AQI_OpenWeather"
              stroke="#ff7300"
              strokeWidth={3}
              name="OpenWeather API Prediction"
              dot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="AQI_ARIMA"
              stroke="#3b82f6"
              strokeDasharray="4 4"
              strokeWidth={2}
              name="Our ARIMA Model Prediction"
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}


