import { FaArrowRight } from "react-icons/fa6";

export default function NewsCard({ title, source, url, author }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-green-300 rounded-xl p-4 shadow-md hover:shadow-lg transition-all w-64"
    >
      {/* Title */}
      <h3 className="text-lg font-secondary font-regular">{title}</h3>

      {/* Author */}
      <p className="text-sm font-secondary text-gray-700 mt-1">
        BY <span className="font-bold">{author}</span>
      </p>

      {/* Source Link */}
      <div className="flex items-center mt-2 text-sm text-gray-900 truncate">
        <span className="truncate">{url}</span>
        <FaArrowRight className="ml-2" />
      </div>
    </a>
  );
}
