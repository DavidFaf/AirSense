import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoIosInformationCircle } from "react-icons/io";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSearch = () => {
    if (query.trim() !== "") {
      onSearch(query);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      {/* Search Bar Section */}
      <div className="flex items-center justify-center">
        <div className="flex items-center border-2 border-gray-500 rounded-full px-4 py-2 w-full max-w-4xl focus-within:border-blue-200 transition-all">
          <input
            type="text"
            placeholder="Enter your city or town name (e.g Peterborough, ON) ..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 outline-none bg-transparent text-gray-700 placeholder-gray-500"
          />
          <button
            onClick={handleSearch}
            className="text-gray-700 hover:text-black"
          >
            <FiSearch size={20} />
          </button>
        </div>

        {/* Info Button */}
        <div className="flex space-x-3 ml-4">
          <button
            onClick={() => setShowModal(true)}
            className="border-2 border-gray-500 rounded-full p-2 hover:bg-gray-400"
          >
            <IoIosInformationCircle size={20} />
          </button>
        </div>
      </div>

      {/* Info Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4 text-[#224b6e]">
              About AirSense
            </h2>
            <p className="text-gray-700 text-sm">
              <strong>AirSense</strong> is a capstone project designed by{" "}
              <a
                className="text-[#224b6e] font-bold italic underline"
                href="https://github.com/DavidFaf"
                target="blank"
              >
                David
              </a>{" "}
              and{" "}
              <a
                className="text-[#224b6e] font-bold italic underline"
                href="https://github.com/Obinomen-desmond"
                target="blank"
              >
                Desmond
              </a>{" "}
              to help users monitor real-time air quality and gain actionable
              insights through AI. It fetches air pollutant data for a location
              and uses statistical and LLM models to forecast pollution levels
              and provide health recommendations.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
