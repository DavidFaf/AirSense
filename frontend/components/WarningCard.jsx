import { FaExclamationTriangle } from "react-icons/fa";

export default function WarningCard({
  city,
  multiple,
  mainPollutant,
  severity,
}) {
  // Local style logic based on severity ratio
  let bg = "bg-green-100";
  let border = "border-green-400";
  let text = "text-green-900";

  if (multiple > 1 && multiple <= 1.5) {
    bg = "bg-yellow-100";
    border = "border-yellow-400";
    text = "text-yellow-900";
  } else if (multiple > 1.5 && multiple <= 2.5) {
    bg = "bg-orange-100";
    border = "border-orange-400";
    text = "text-orange-900";
  } else if (multiple > 2.5) {
    bg = "bg-red-100";
    border = "border-red-400";
    text = "text-red-900";
  }

  return (
    <div
      className={`flex items-center p-4 border ${border} ${bg} ${text} rounded-xl w-full max-w-3xl`}
    >
      <FaExclamationTriangle className="text-xl mr-3" />
      <p className="text-sm">
        The <span className="font-medium">{mainPollutant}</span> concentration
        in <span className="font-bold italic">{city}</span> is currently{" "}
        <span className="font-bold italic">{multiple}</span> times the WHO annual{" "}
        <span className="font-medium">{mainPollutant}</span> guideline value.
      </p>
    </div>
  );
}
