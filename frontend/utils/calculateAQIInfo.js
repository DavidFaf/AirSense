import { breakpoints } from "@models/breakpoints";

export function calculateAQIInfo(data) {
  const components = data?.list?.[0]?.components;

  if (!components) return null;

  const calculateIndividualAQI = (value, scale) => {
    for (let [C_low, C_high, I_low, I_high] of scale) {
      if (value >= C_low && value <= C_high) {
        return Math.round(
          ((I_high - I_low) / (C_high - C_low)) * (value - C_low) + I_low
        );
      }
    }
    return null;
  };

  const aqiValues = {};
  for (const key in components) {
    if (breakpoints[key]) {
      const aqi = calculateIndividualAQI(components[key], breakpoints[key]);
      if (aqi !== null) {
        aqiValues[key] = {
          aqi,
          value: components[key],
        };
      }
    }
  }

  if (Object.keys(aqiValues).length === 0) return null;

  const [mainPollutant, { aqi: maxAqi, value: mainValue }] = Object.entries(
    aqiValues
  ).reduce((max, curr) => (curr[1].aqi > max[1].aqi ? curr : max));

  // Scale AQI down to 0–100 for easier interpretationd
  const scaledAqi = Math.round((maxAqi / 500) * 100);

  const getAQILevel = (scaledAqi) => {
    if (scaledAqi <= 25)
      return { level: "Good", color: "bg-green-400", bgColor: "bg-green-300" };
    if (scaledAqi <= 50)
      return {
        level: "Moderate",
        color: "bg-yellow-400",
        bgColor: "bg-yellow-300",
      };
    if (scaledAqi <= 75)
      return {
        level: "Unhealthy for Sensitive Groups",
        color: "bg-orange-400",
        bgColor: "bg-orange-300",
      };
    if (scaledAqi <= 100)
      return { level: "Hazardous", color: "bg-red-500", bgColor: "bg-red-400" };
    return { level: "Hazardous", color: "bg-rose-800", bgColor: "bg-rose-700" };
  };

  const { level, color, bgColor } = getAQILevel(scaledAqi);

  return {
    aqi: scaledAqi,
    level,
    color,
    bgColor,
    mainPollutant: mainPollutant.toUpperCase(),
    mainConcentration: `${mainValue} µg/m³`,
  };
}
