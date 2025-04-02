import { useRef } from "react";
import { FaCircleInfo, FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import ForecastCard from "./ForecastCard";

export default function ForecastCarousel({ forecastData }) {
  const scrollRef = useRef(null);

  // Function to scroll left
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -250, behavior: "smooth" });
    }
  };

  // Function to scroll right
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 250, behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      {/* Wrapper for Arrows & Scrollable Section */}
      <div className="relative flex items-center justify-center mt-4">
        {/* Left Button (Outside the box) */}
        <button
          onClick={scrollLeft}
          className="absolute left-[-40px] top-1/2 transform -translate-y-1/2 bg-gray-200 p-3 rounded-full shadow-md hover:bg-gray-300 transition"
        >
          <FaChevronLeft size={20} />
        </button>

        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          className="flex p-4 space-x-4 overflow-x-auto scrollbar-hide scroll-smooth snap-x w-full max-w-4xl"
        >
          {forecastData.map((forecast, index) => (
            <div key={index} className="snap-start shrink-0 w-64">
              <ForecastCard
                date={forecast.date}
                aqi={forecast.aqi}
                pollutant={forecast.pollutant}
                concentration={forecast.concentration}
                bgColor={forecast.bgColor}
              />
            </div>
          ))}
        </div>

        {/* Right Button (Outside the box) */}
        <button
          onClick={scrollRight}
          className="absolute right-[-40px] top-1/2 transform -translate-y-1/2 bg-gray-200 p-3 rounded-full shadow-md hover:bg-gray-300 transition"
        >
          <FaChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
