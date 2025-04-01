export const getColorClass = (value, limit) => {
  const ratio = value / limit;

  if (ratio <= 0.5) return "bg-green-500";
  if (ratio <= 1) return "bg-yellow-400";
  if (ratio <= 1.5) return "bg-orange-400";
  if (ratio <= 2) return "bg-red-500";
  if (ratio <= 3) return "bg-orange-500";
  return "bg-red-600";
};
