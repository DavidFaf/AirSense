import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function AQIForecastGraph({ forecastData, arimaForecast }) {
  const isEmpty =
    !forecastData?.list?.length && !arimaForecast?.list?.length;

  // if (isEmpty) {
  //   return (
  //     <div className="mt-5 mb-10">
  //       <h2 className="text-lg text-gray-600 font-bold">Forecast graph</h2>
  //       <div className="h-64 flex items-center justify-center bg-gray-50 text-gray-500 border border-gray-200 rounded-md">
  //         No forecast data yet
  //       </div>
  //     </div>
  //   );
  // }

  const generateMockForecast = () => {
    const baseAQI = 33;
    const days = 7;
    const mockData = [];
  
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      const day = date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
  
      const aqiOpenWeather = Math.max(
        10,
        Math.min(100, baseAQI + Math.floor(Math.random() * 10 - 5))
      );
      const aqiARIMA = Math.max(
        10,
        Math.min(100, baseAQI + Math.floor(Math.random() * 10 - 3))
      );
  
      mockData.push({
        date: date.toDateString(),
        day,
        AQI_OpenWeather: aqiOpenWeather,
        AQI_ARIMA: aqiARIMA,
      });
    }
  
    return mockData;
  };
  

  const formatForecast = (list, source) =>
    list?.map((entry) => {
      const date = new Date(entry.dt * 1000);
      const day = date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });

      const scaledAQI = Math.round((entry.main.aqi / 5) * 100);

      return {
        date: date.toDateString(), // for deduping
        day,
        [`AQI_${source}`]: scaledAQI,
      };
    }) || [];

  const openWeatherAQI = formatForecast(forecastData?.list, "OpenWeather");
  const arimaAQI = formatForecast(arimaForecast?.list, "ARIMA");

  // Merge by date
  const mergedMap = new Map();

  [...openWeatherAQI, ...arimaAQI].forEach((entry) => {
    if (!mergedMap.has(entry.date)) {
      mergedMap.set(entry.date, { day: entry.day });
    }
    const existing = mergedMap.get(entry.date);
    Object.assign(existing, entry);
  });

  // const mergedData = Array.from(mergedMap.values());

  // added this for mock data 
  const mergedData = mergedMap.size > 0
  ? Array.from(mergedMap.values())
  : generateMockForecast(); 

  return (
    <div className="mt-5 mb-10">
      <h2 className="text-lg text-gray-600 font-bold">Forecast graph</h2>

      <div className="mt-6 w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mergedData}>
            <XAxis dataKey="day" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Legend />

            {/* OpenWeather AQI */}
            <Line
              type="monotone"
              dataKey="AQI_OpenWeather"
              stroke="#ff7300"
              strokeWidth={3}
              name="OpenWeather API Prediction"
              dot={{ r: 4 }}
            />

            {/* ARIMA AQI */}
            <Line
              type="monotone"
              dataKey="AQI_ARIMA"
              stroke="#3b82f6"
              strokeDasharray="4 4"
              strokeWidth={2}
              name="Our ARIMA model Prediction"
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
