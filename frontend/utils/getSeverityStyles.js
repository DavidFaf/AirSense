export const getSeverityStyles = (ratio) => {
  if (ratio <= 1)
    return {
      bg: "bg-green-100",
      border: "border-green-400",
      text: "text-green-900",
    };
  if (ratio <= 1.5)
    return {
      bg: "bg-yellow-100",
      border: "border-yellow-400",
      text: "text-yellow-900",
    };
  if (ratio <= 2.5)
    return {
      bg: "bg-orange-100",
      border: "border-orange-400",
      text: "text-orange-900",
    };
  return { bg: "bg-red-100", border: "border-red-400", text: "text-red-900" };
};
