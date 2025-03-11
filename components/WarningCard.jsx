import { FaExclamationTriangle } from "react-icons/fa";

export default function WarningCard({ message }) {
  return (
    <div className="flex items-center p-4 border border-red-400 bg-red-100 text-red-900 rounded-xl w-full max-w-3xl">
      {/* Warning Icon */}
      <FaExclamationTriangle className="text-red-600 text-xl mr-3" />

      {/* Warning Message */}
      <p className="text-sm">
        {message}
      </p>
    </div>
  );
}
