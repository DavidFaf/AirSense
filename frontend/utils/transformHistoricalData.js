// Function that will convert incoming pollutant data into a more usable format for the "AirQualityChart" component

export const transformHistoricalData = (apiData) => {
  if (!apiData?.list) return [];

  return apiData.list.map((entry) => {
    const { dt, components } = entry;

    const date = new Date(dt * 1000).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });

    return {
      date,
      pollutants: {
        PM2_5: components.pm2_5,
        PM10: components.pm10,
        NO2: components.no2,
        O3: components.o3,
      },
    };
  });
};
