import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { historicalAirQualityData } from "@models/historicalAirQualityData";

export default function AirQualityChart() {
  const [selectedPollutant, setSelectedPollutant] = useState("PM2_5");

  // Format the date from "YYYY-MM-DD" to "Month Day"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric" });
  };

  // Transform data for the selected pollutant
  const chartData = historicalAirQualityData.map((entry) => ({
    date: formatDate(entry.date), // Converts "2025-03-04" → "March 4"
    value: entry.pollutants[selectedPollutant],
  }));

  return (
    <div>
      {/* Heading */}

      {/* Pollutant Selection Dropdown */}
      <div className="mt-4">
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
      </div>

      {/* Bar Chart */}
      <div className="mt-6 w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#a8e060" />
          </BarChart>
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
