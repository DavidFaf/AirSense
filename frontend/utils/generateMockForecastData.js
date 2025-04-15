// utils/forecastData.js
export function generateMockForecastData(baseAqi = 33) {
  const now = Date.now();
  return Array.from({ length: 7 }, (_, i) => {
    const dt = Math.floor((now + i * 86400000) / 1000);
    const source = i < 3 ? "openweather" : "arima";
    const aqi = Math.round(baseAqi + Math.random() * 2);
    
    return {
      dt,
      source,
      components: {
        co: +(250 + Math.random() * 150).toFixed(2),
        no: +(Math.random() * 5).toFixed(2),
        no2: +(Math.random() * 15).toFixed(2),
        o3: +(60 + Math.random() * 40).toFixed(2),
        so2: +(0.5 + Math.random() * 8).toFixed(2),
        pm2_5: +(1 + Math.random() * 10).toFixed(2),
        pm10: +(1 + Math.random() * 15).toFixed(2),
        nh3: +(1 + Math.random() * 5).toFixed(2),
      },
      main: { aqi },
      day: new Date(now + i * 86400000).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }),
      aqiValue: aqi,  // Added for easier access
    };
  });
}