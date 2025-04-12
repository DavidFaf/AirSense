import dayjs from "@node_modules/dayjs";
const generateMockAQIEntries = (source) => {
  const mockList = [];

  for (let i = 0; i < 7; i++) {
    const dt = dayjs().add(i, "day").unix();

    const scaledAQI = Math.round(31 + Math.random() * 4); // 31–35
    const aqiIndex = Math.max(1, Math.min(5, Math.round((scaledAQI / 100) * 5)));

    mockList.push({
      dt,
      main: { aqi: aqiIndex },
      components: {
        co: parseFloat((200 + Math.random() * 150).toFixed(2)),
        no: parseFloat((Math.random() * 5).toFixed(2)),
        no2: parseFloat((Math.random() * 20).toFixed(2)),
        o3: parseFloat((Math.random() * 100).toFixed(2)),
        so2: parseFloat((Math.random() * 5).toFixed(2)),
        pm2_5: parseFloat((scaledAQI / 3).toFixed(2)),
        pm10: parseFloat((scaledAQI / 2).toFixed(2)),
        nh3: parseFloat((Math.random() * 3).toFixed(2)),
      },
      source,
    });
  }

  return mockList;
};
;


export default generateMockAQIEntries;