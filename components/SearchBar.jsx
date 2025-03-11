import { FiSearch } from "react-icons/fi";
import { IoIosInformationCircle, IoMdSettings } from "react-icons/io";

export default function SearchBar() {
  return (
    <div className="flex items-center justify-center">
      {/* Search Input Section */}
      <div className="flex items-center border-2 border-gray-500 rounded-full px-4 py-2 w-full max-w-4xl focus-within:border-blue-200 transition-all">
        <input
          type="text"
          placeholder="Enter your city or town name ..."
          className="flex-1 outline-none bg-transparent text-gray-700 placeholder-gray-500"
        />
        <button className="text-gray-700 hover:text-black">
          <FiSearch size={20} />
        </button>
      </div>

      {/* Icons Section */}
      <div className="flex space-x-3 ml-4">
        <button className="border-2 border-gray-500 rounded-full p-2 hover:bg-gray-400">
          <IoIosInformationCircle size={20} />
        </button>
        <button className="border-2 border-gray-500 rounded-full p-2 hover:bg-gray-400">
          <IoMdSettings size={20} />
        </button>
      </div>
    </div>
  );
}
