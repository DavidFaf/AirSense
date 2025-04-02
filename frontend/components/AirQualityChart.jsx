import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import { dummyHistoricalData } from "@models/historicalAirQualityData";
import { averagePollutantsByDay } from "@/utils/averagePollutantsByDay";


export default function AirQualityChart({ historicalData }) {
  const [selectedPollutant, setSelectedPollutant] = useState("PM2_5");
  const [viewAll, setViewAll] = useState(false);

  // // Format the date from "YYYY-MM-DD" to "Month Day"
  // const formatDate = (dateString) => {
  //   const date = new Date(dateString);
  //   return date.toLocaleDateString("en-US", { month: "long", day: "numeric" });
  // };

  // Function to render historicalAirQualityData if historicalData is not provided
  const dataToRender = historicalData?.length ? historicalData : dummyHistoricalData;
  const averagedData = averagePollutantsByDay(dataToRender);

  // Transform data for the selected pollutant
  const chartData = dataToRender.map((entry) => ({
    date: entry.date,
    value: entry.pollutants[selectedPollutant],
  }));

  return (
    <div>
      {/* Heading */}

      {/* Pollutant Selection Dropdown */}
      {/* <div className="mt-4">
        <label className="text-gray-700 font-semibold mr-2">Pollutant:</label>
        <select
          value={selectedPollutant}
          onChange={(e) => setSelectedPollutant(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="PM2_5">PM2.5</option>
          <option value="PM10">PM10</option>
          <option value="NO2">NO2</option>
          <option value="O3">O3</option>
        </select>
      </div> */}

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
        </button>
      </div>

      {/* Bar Chart */}
      <div className="mt-6 w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          {viewAll ? (
            // 📈 Multi-line Chart
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
            // 📊 Single-bar Chart
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

// {line chart}
// import { useState } from "react";
// import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
// import { historicalAirQualityData } from "./data";

// export default function AirQualityChart() {
//   const [selectedPollutant, setSelectedPollutant] = useState("PM2_5");

//   // Format the date from "YYYY-MM-DD" to "Month Day"
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", { month: "long", day: "numeric" });
//   };

//   // Transform data for the selected pollutant
//   const chartData = historicalAirQualityData.map((entry) => ({
//     date: formatDate(entry.date), // Converts "2025-03-04" → "March 4"
//     value: entry.pollutants[selectedPollutant],
//   }));

//   return (
//     <section className="max-w-4xl mx-auto p-6">
//       {/* Heading */}
//       <h2 className="text-2xl font-bold">Historical Air Quality Data</h2>
//       <p className="text-gray-600">Select a pollutant to view historical trends.</p>

//       {/* Pollutant Selection Dropdown */}
//       <div className="mt-4">
//         <label className="text-gray-700 font-semibold mr-2">Pollutant:</label>
//         <select
//           value={selectedPollutant}
//           onChange={(e) => setSelectedPollutant(e.target.value)}
//           className="p-2 border rounded-md"
//         >
//           <option value="PM2_5">PM2.5</option>
//           <option value="PM10">PM10</option>
//           <option value="NO2">NO2</option>
//           <option value="O3">O3</option>
//         </select>
//       </div>

//       {/* Line Chart */}
//       <div className="mt-6 w-full h-64">
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart data={chartData}>
//             <XAxis dataKey="date" />
//             <YAxis />
//             <Tooltip />
//             <Line type="monotone" dataKey="value" stroke="#ff7300" strokeWidth={2} />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </section>
//   );
// }
