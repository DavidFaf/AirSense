import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";
import { averagePollutantsByDay } from "@utils/averagePollutantsByDay";

export default function AirQualityChart({ historicalData }) {
  const [selectedPollutant, setSelectedPollutant] = useState("PM2_5");
  const [viewAll, setViewAll] = useState(false);

  // Show fallback if no data
  if (!historicalData || historicalData.length === 0) {
    return (
      <div className="mt-5 mb-10">
        <h2 className="text-lg text-gray-600 font-bold">Forecast graph</h2>
        <div className="h-64 flex items-center justify-center bg-gray-50 text-gray-500 border border-gray-200 rounded-md">
          No forecast data yet
        </div>
      </div>
    );
  }

  const averagedData = averagePollutantsByDay(historicalData);

  return (
    <div>
      <div className="flex items-center justify-between mt-4">
        <div>
          <label className="text-gray-700 font-semibold mr-2">Pollutant:</label>
          <select
            value={selectedPollutant}
            onChange={(e) => setSelectedPollutant(e.target.value)}
            className="p-2 border rounded-md"
            disabled={viewAll}
          >
            <option value="PM2_5">PM2.5</option>
            <option value="PM10">PM10</option>
            <option value="NO2">NO2</option>
            <option value="O3">O3</option>
          </select>
        </div>

        <button
          onClick={() => setViewAll((prev) => !prev)}
          className="ml-4 text-sm px-4 py-2 border rounded-md hover:bg-gray-200"
        >
          {viewAll ? (
            <span className="hover:underline">View Single Pollutant</span>
          ) : (
            "Compare All Pollutants"
          )}
        </button>
      </div>

      {viewAll && (
        <div className="flex flex-wrap gap-4 mt-4 text-sm font-medium text-gray-700">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-green-500 inline-block" />
            <span>PM2.5</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-blue-500 inline-block" />
            <span>PM10</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-orange-500 inline-block" />
            <span>NO2</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
            <span>O3</span>
          </div>
        </div>
      )}

      {/* Chart Section */}
      <div className="mt-6 w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          {viewAll ? (
            <LineChart data={averagedData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip
                formatter={(value, name) => [
                  `${value} µg/m³`,
                  name.replace("pollutants.", ""),
                ]}
              />
              <Line
                type="monotone"
                dataKey="pollutants.PM2_5"
                stroke="#22c55e"
                name="PM2.5"
              />
              <Line
                type="monotone"
                dataKey="pollutants.PM10"
                stroke="#3b82f6"
                name="PM10"
              />
              <Line
                type="monotone"
                dataKey="pollutants.NO2"
                stroke="#f97316"
                name="NO2"
              />
              <Line
                type="monotone"
                dataKey="pollutants.O3"
                stroke="#e11d48"
                name="O3"
              />
            </LineChart>
          ) : (
            <BarChart
              data={averagedData.map((entry) => ({
                date: entry.date,
                value: entry.pollutants[selectedPollutant],
              }))}
            >
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip
                formatter={(value) => [`${value} µg/m³`, selectedPollutant]}
              />
              <Bar dataKey="value" fill="#a8e060" />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
