import dayjs from "@node_modules/dayjs";

const generateMockForecasts = (source) => {
    const baseAQI = 33;
    const mockList = [];
  
    for (let i = 0; i < 7; i++) {
      const dt = dayjs().add(i, "day").unix();
      const aqiValue = Math.max(
        1,
        Math.min(5, Math.floor(baseAQI / 20 + Math.random() * 2))
      ); // AQI index between 1–5
  
      const components = {
        co: 200 + Math.random() * 100,
        no2: 10 + Math.random() * 5,
        o3: 50 + Math.random() * 10,
        so2: 1 + Math.random() * 1,
        pm2_5: 5 + Math.random() * 2,
        pm10: 10 + Math.random() * 5,
        nh3: 2 + Math.random() * 1,
      };
  
      mockList.push({
        dt,
        source,
        main: { aqi: aqiValue },
        components,
      });
    }
  
    return { list: mockList };
  };
  
  export default generateMockForecasts;  