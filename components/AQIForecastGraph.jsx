import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { aqiForecastData } from "@models/aqiForecastData";

export default function AQIForecastGraph() {
  return (
    <div className="mt-5 mb-10">
      {/* Heading */}
      <h2 className="text-lg text-gray-600 font-bold">Forecast graph</h2>

      {/* Line Chart */}
      <div className="mt-6 w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={aqiForecastData}>
            {/* X-Axis (Days of the Week) */}
            <XAxis dataKey="day" />

            {/* Y-Axis (AQI Levels) */}
            <YAxis />

            {/* Tooltip */}
            <Tooltip
              formatter={(value, name, props) => {
                if (name === "AQI") {
                  return [`${value} AQI`, "Predicted Air Quality Index"];
                }
                return [`${value} µg/m³`, props.payload.mainPollutant];
              }}
            />

            {/* AQI Line */}
            <Line
              type="monotone"
              dataKey="AQI"
              stroke="#ff7300"
              strokeWidth={3}
              dot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
