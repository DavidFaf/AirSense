// import { useRef } from "react";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
// import ForecastCard from "./ForecastCard";
// import { calculateAQIInfo } from "@utils/calculateAQIInfo";

// export default function ForecastCarousel({ forecastData }) {
//   const scrollRef = useRef(null);

//   const scrollLeft = () => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollBy({ left: -250, behavior: "smooth" });
//     }
//   };

//   const scrollRight = () => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollBy({ left: 250, behavior: "smooth" });
//     }
//   };

//   if (!forecastData?.list || forecastData.list.length === 0) {
//     return (
//       <div className="mt-5 mb-10">
//         <div className="h-64 flex items-center justify-center bg-gray-50 text-gray-500 border border-gray-200 rounded-md">
//           No forecast data yet
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="relative">
//       <div className="relative flex items-center justify-center mt-4">
//         <button
//           onClick={scrollLeft}
//           className="absolute left-[-40px] top-1/2 transform -translate-y-1/2 bg-gray-200 p-3 rounded-full shadow-md hover:bg-gray-300 transition"
//         >
//           <FaChevronLeft size={20} />
//         </button>

//         <div
//           ref={scrollRef}
//           className="flex p-4 space-x-4 overflow-x-auto scrollbar-hide scroll-smooth snap-x w-full max-w-4xl"
//         >
//           {[
//             ...new Map(
//               forecastData?.list?.map((entry) => {
//                 const day = new Date(entry.dt * 1000).toDateString(); // Unique per day
//                 return [day, entry]; // Use date string as map key to remove duplicates
//               })
//             ).values(),
//           ].map((entry, index) => {
//             const miniData = { list: [entry] };
//             const info = calculateAQIInfo(miniData);
//             if (!info) return null;

//             const date = new Date(entry.dt * 1000).toLocaleDateString("en-US", {
//               weekday: "short",
//               month: "short",
//               day: "numeric",
//             });

//             return (
//               <div key={index} className="snap-start shrink-0 w-64">
//                 <ForecastCard
//                   date={date}
//                   aqi={info.aqi}
//                   pollutant={info.mainPollutant}
//                   concentration={info.mainConcentration}
//                   bgColor={info.bgColor}
//                 />
//               </div>
//             );
//           })}
//         </div>

//         <button
//           onClick={scrollRight}
//           className="absolute right-[-40px] top-1/2 transform -translate-y-1/2 bg-gray-200 p-3 rounded-full shadow-md hover:bg-gray-300 transition"
//         >
//           <FaChevronRight size={20} />
//         </button>
//       </div>
//     </div>
//   );
// }

import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import ForecastCard from "./ForecastCard";
import { calculateAQIInfo } from "@utils/calculateAQIInfo";
import dayjs from "dayjs";
import generateMockAQIEntries from "@utils/generateMockAQIEntries";

export default function ForecastCarousel({
  openWeatherForecast,
  arimaForecast,
}) {
  const scrollRef = useRef(null);

  const tagForecasts = (forecast, source) =>
    forecast?.list?.map((entry) => ({ ...entry, source })) || [];

  const taggedOpenWeather = tagForecasts(openWeatherForecast, "openweather");
  const taggedArima = tagForecasts(arimaForecast, "arima");

//   const isDemoMode = false

// const taggedOpenWeather = isDemoMode
//   ? generateMockAQIEntries("openweather")
//   : tagForecasts(openWeatherForecast, "openweather");

// const taggedArima = isDemoMode
//   ? generateMockAQIEntries("arima")
//   : tagForecasts(arimaForecast, "arima");


  const merged = [...taggedOpenWeather, ...taggedArima]
    .sort((a, b) => a.dt - b.dt)
    .reduce((acc, curr) => {
      const dateKey = dayjs.unix(curr.dt).format("YYYY-MM-DD");
      if (
        !acc.some(
          (item) => dayjs.unix(item.dt).format("YYYY-MM-DD") === dateKey
        )
      ) {
        acc.push(curr);
      }
      return acc;
    }, []);

  const scroll = (direction) => {
    scrollRef.current?.scrollBy({ left: direction * 250, behavior: "smooth" });
  };

  console.log("Forecast CAROUSER GRAPH Data:", openWeatherForecast);
  console.log("ARIMA FORECAST CAROUSEL Forecast:", arimaForecast);
  console.log("GRAPH FORECAST CAROUSEL MERGED DATA:", merged);

  return (
    <div className="relative mt-4">
      <div className="relative flex items-center justify-center">
        <button
          onClick={() => scroll(-1)}
          className="absolute left-[-40px] top-1/2 -translate-y-1/2 p-3 rounded-full shadow-md bg-gray-200 hover:bg-gray-300"
        >
          <FaChevronLeft size={20} />
        </button>

        <div
          ref={scrollRef}
          className="flex p-4 space-x-4 overflow-x-auto scrollbar-hide scroll-smooth snap-x w-full max-w-4xl"
        >
          {merged.map((entry, index) => {
            const info = calculateAQIInfo({ list: [entry] });
            if (!info) return null;

            return (
              <div key={index} className="snap-start shrink-0 w-64">
                <ForecastCard
                  date={dayjs.unix(entry.dt).format("dddd, MMM D")}
                  aqi={info.aqi}
                  pollutant={info.mainPollutant}
                  concentration={info.mainConcentration}
                  bgColor={info.bgColor}
                  source={
                    entry.source === "arima" ? "Our ARIMA Model" : "OpenWeather API"
                  }
                />
              </div>
            );
          })}
        </div>

        <button
          onClick={() => scroll(1)}
          className="absolute right-[-40px] top-1/2 -translate-y-1/2 p-3 rounded-full shadow-md bg-gray-200 hover:bg-gray-300"
        >
          <FaChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}



